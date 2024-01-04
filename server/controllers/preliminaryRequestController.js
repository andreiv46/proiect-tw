import PreliminaryRequest, { PRESTATUS } from "../models/preliminaryRequest.js";
import FinalRequest, { FINAL_STATUS } from "../models/finalRequest.js";
import Student from "../models/student.js";
import EnrollmentSession from "../models/enrollmentSession.js";
import { Op } from "sequelize";

export const createPreliminaryRequest = async (req, res) => {
  try {
    const { studentId, sessionId, title, description } = req.body;

    if (!studentId || !sessionId || !title || !description) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const request = await PreliminaryRequest.findOne({
      where: {
        studentId: studentId,
        sessionId: sessionId,
        status: PRESTATUS.PENDING,
      },
    });

    if (request) {
      return res.status(409).json({
        message: "You cannot submit multiple pending requests simultaneously!",
      });
    }

    const newPreliminaryRequest = await PreliminaryRequest.create({
      studentId: studentId,
      sessionId: sessionId,
      title: title,
      description: description,
      professorJustification: null,
      status: PRESTATUS.PENDING,
    });

    if (!newPreliminaryRequest) {
      return res.status(400).json({ message: "Invalid data" });
    }

    res
      .status(201)
      .json({ message: "Preliminary request created", newPreliminaryRequest });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const acceptPreliminaryRequest = async (req, res) => {
  try {
    const { preliminaryRequestId } = req.body;

    if (!preliminaryRequestId) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const preliminaryRequest = await PreliminaryRequest.findOne({
      where: {
        preliminaryRequestId: preliminaryRequestId,
      },
    });

    if (!preliminaryRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    const session = await EnrollmentSession.findOne({
      where: {
        sessionId: preliminaryRequest.sessionId,
      },
    });

    if (session.enrolledStudents >= session.studentsLimit) {
      return res.status(409).json({ message: "Session is full" });
    }

    const student = await Student.findOne({
      where: {
        studentId: preliminaryRequest.studentId,
      },
    });

    preliminaryRequest.status = PRESTATUS.APPROVED;
    await preliminaryRequest.save();

    student.assignedProfessorId = req.body.professorId;
    await student.save();

    session.enrolledStudents += 1;
    await session.save();

    res.status(200).json({ message: "Preliminary request accepted" });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const rejectPreliminaryRequest = async (req, res) => {
  try {
    const { preliminaryRequestId, professorJustification } = req.body;

    if (!preliminaryRequestId || !professorJustification) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const preliminaryRequest = await PreliminaryRequest.findOne({
      where: {
        preliminaryRequestId: preliminaryRequestId,
      },
    });

    if (!preliminaryRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    await preliminaryRequest.update({
      status: PRESTATUS.REJECTED,
      professorJustification: professorJustification,
    });

    return res.status(200).json({ message: "Preliminary request rejected" });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const getPreliminaryRequests = async (req, res) => {
  try {
    const { professorId, studentId } = req.body;

    if (!professorId && !studentId) {
      return res.status(400).json({ message: "Malformed request" });
    }

    if (studentId) {
      const preliminaryRequests = await PreliminaryRequest.findAll({
        where: {
          studentId: studentId,
        },
      });

      if (!preliminaryRequests) {
        return res.status(404).json({ message: "Requests not found" });
      }

      return res.status(200).json({ preliminaryRequests });
    }

    if (professorId) {
      const activeEnrollmentSession = await EnrollmentSession.findOne({
        where: {
          startTime: { [Op.lt]: new Date() },
          endTime: { [Op.gt]: new Date() },
          enrolledStudents: { [Op.lt]: { [Op.col]: "studentsLimit" } },
          professorId: professorId,
        },
      });
      if (!activeEnrollmentSession) {
        return res
          .status(404)
          .json({ message: "No active enrollment session" });
      }
      if (activeEnrollmentSession) {
        const preliminaryRequests = await PreliminaryRequest.findAll({
          where: {
            sessionId: activeEnrollmentSession.sessionId,
            status: PRESTATUS.PENDING,
          },
        });
        if (!preliminaryRequests) {
          return res.status(404).json({ message: "No preliminary requests" });
        }
        return res.status(200).json({ preliminaryRequests });
      }
    }
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};
