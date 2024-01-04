import Input from "../ui/Input.jsx";
import { useState } from "react";
import { generateRequestFileName } from "../../../lib/utils.jsx";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "80%",
    height: "auto",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    marginBottom: 30,
  },
  signature: {
    fontSize: 12,
    marginTop: 20,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
});

const RequestPDF = ({ student, professor, title }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.imageContainer}>
          <Image src="/Sigla.png" style={styles.image} />
        </View>
        <Text style={styles.heading}>
          Subsemnatul/a {student.name}, student/a in anul {student.year} in
          cadrul facultatii de Cibernetica, Statistica si Informatica Economica,
          forma de invatamant IF, specializarea: {student.major}
        </Text>
        <Text style={styles.content}>
          Va rog sa binevoiti a-mi aproba realizarea lucrarii de disertatie cu
          titlul: {title}
        </Text>
        <Text style={styles.content}>
          Avand coordonator stiintific pe dl/dna {professor.name}
        </Text>
        <Text style={styles.content}>
          Mentionez ca am fost inmatriculat/a in anul universitar 2020-2021,
          email {student.email}
        </Text>
        <Text style={styles.signature}>
          Data _____________ Semnatura student
        </Text>
        <Text style={styles.signature}>
          Data _____________ Semnatura coordonator stiintific
        </Text>
        <Text style={styles.signature}>
          Domnul Decan al Facultatii de Cibernetica, Statistica si Informatica
          Economica
        </Text>
      </Page>
    </Document>
  );
};

const RequestGenerator = ({ student, professor }) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div className="flex flex-col items-center bg-slate-300 shadow-md rounded-lg p-8">
      <div className="flex justify-center items-center w-full max-w-md">
        <Input
          type="text"
          placeholder="Titlu lucrare"
          onChange={handleTitleChange}
          className="mb-4"
        />
      </div>
      <div className="mt-7">
        <PDFDownloadLink
          document={
            <RequestPDF student={student} professor={professor} title={title} />
          }
          fileName={generateRequestFileName(student, professor)}
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          {({ loading }) =>
            loading ? "Loading document..." : "Descarca cererea"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default RequestGenerator;
