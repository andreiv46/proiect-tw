#Aplicație web pentru înregistrarea la disertație

##Obiectiv

Realizarea unei aplicații web permite înregistrarea studenților la disertație.

##Descriere

Aplicația trebuie să permită administrarea unor cereri de disertație.

Platforma este bazată pe o aplicație web cu arhitectură de tip Single Page Application accesibilă în browser de pe desktop, dispozitive mobile sau tablete (considerând preferințele utilizatorului).

##Funcționalități (minime)

- Aplicația are două feluri de utilizatori, studenți și profesori
- Un profesor are o serie de sesiuni de înscriere, care nu se pot suprapune
- În cadrul unei sesiuni de înscriere, un student poate face o cerere preliminară unui profesor
- Profesorul poate aproba cererea unui student în limita unui număr prestabilit
- Profesorul poate de asemenea respinge cererea cu o justificare
- Un student poate face adresa cereri mai multor profesori, dar dacă a fost aprobat de unul dintre ei, nu mai poate fi aprobat de un al doilea
- După aprobarea cererii preliminare, studentul poate încărca un fișier (cererea semnată)
- Ca răspuns la cerere, profesorul poate încărca un fișier sau respinge cererea, caz în care studentul va trebui să încarce o nouă cerere
