const subjectLabsConst = {
  "АВС": 3,
  "ВПО": 6,
  "МДиСУБД": 7,
  "ОИнфБ": 0, // 8
  "ОСиСП": 6,
  "СППР": 13,
  "СТРweb-пр": 4,
  "ФизК": 0,
  "ИСОБ": 7,
  "МТран": 5,
};

let subjectLabs = { ...subjectLabsConst };

let currentSort = {
  subject: null,
  direction: 1 // 1 = по возрастанию, -1 = по убыванию
};


let cachedStudents = [];
let cachedIds = [];

function getIdsFromForm() {
    let str = document.getElementById("studentIds").value;
    return str.split(/[\s,]+/).filter(Boolean).map(Number);
}

async function loadRatings() {
  let ids = getIdsFromForm(); 
  const btn = document.getElementById("loadBtn");
  const errorLog = document.getElementById("errorLog");

  btn.disabled = true;
  btn.textContent = "Загрузка...";
  errorLog.innerHTML = ""; 

  let promises = ids.map(id =>
    fetch(`https://iis.bsuir.by/api/v1/rating/studentRating?studentCardNumber=${id}`)
      .then(resp => {
        if (!resp.ok) throw new Error(`Ошибка`);
        return resp.json();
      })
      .then(data => ({ success: true, id: id, data: data }))
      .catch(err => ({ success: false, id: id }))
  );

  subjectLabs = { ...subjectLabsConst };

  let results = await Promise.all(promises);

  let successfulStudents = [];
  let successfulIds = [];
  let failedIds = [];

  results.forEach(res => {
    if (res.success) {
      successfulStudents.push(res.data);
      successfulIds.push(res.id);
    } else {
      failedIds.push(res.id);
    }
  });

  if (failedIds.length > 0) {
    errorLog.innerHTML = `Не найдены или не загружены: ${failedIds.join(", ")}`;
  }

  btn.disabled = false;
  btn.textContent = "Получить статистику";

  cachedStudents = successfulStudents;
  cachedIds = successfulIds;
  buildTable(cachedStudents, cachedIds);
}

function getStudentLessons(student) {
  let data = [];
  let lessons = student.lessons || [];

  for (let lesson of lessons) {
    let subject = lesson.lessonNameAbbrev;
    let type = lesson.lessonTypeAbbrev;
    let omissions = parseInt(lesson.gradebookOmissions || 0);

    let marksArray = [];

    if (lesson.marks && Array.isArray(lesson.marks)) {
      marksArray = lesson.marks.map(m => Number(m));
    }

    data.push({ subject, type, marks: marksArray, omissions });
  }
  return data;
}

function calcAverage(marks) {
  if (!marks || marks.length === 0) return null;
  let sum = marks.reduce((a, b) => a + b, 0);
  return (sum / marks.length).toFixed(2);
}

function buildTable(students, ids) {
  let subjectsSet = new Set();

  students.forEach(student => {
      let lessons = getStudentLessons(student);
      lessons.forEach(l => subjectsSet.add(l.subject));
  });

  let subjects = Array.from(subjectsSet).sort();

  let headerRow = document.getElementById("headerRow");
  headerRow.innerHTML = "<th>Студент</th>";
  subjects.forEach(subj => {
      let initialValue = subjectLabs[subj] || 0;
      let options = "";

      for (let i = 0; i <= 20; i++) {
        options += `<option value="${i}" ${i === initialValue ? "selected" : ""}>${i}</option>`;
      }

      headerRow.innerHTML += `
      <th class="sortable-subject" data-subject="${subj}" style="cursor:pointer;">
        ${subj}<span class="sort-indicator"></span><br>
        <select class="labCountSelect" data-subject="${subj}">
          ${options}
        </select>
      </th>`;

  });

  headerRow.innerHTML += "<th>Процент сдачи</th>";

  let tbody = document.querySelector("#resultsTable tbody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {      
      let studentId = ids[index];
      let lessons = getStudentLessons(student);

      let grouped = {};

      lessons.forEach(l => {
          if (!grouped[l.subject]) grouped[l.subject] = [];

          if (!grouped[l.subject][l.type]) grouped[l.subject][l.type] = [];

          grouped[l.subject][l.type].push(...l.marks);
      });

      let info = studentsInfo.find(s => s.id === studentId);
      let shortName = info ? info.shortName : "";

      let row = "<tr>";
      row += `<td><b>${studentId}</b><br>
                     ${shortName}</td>`;

      let totalDone = 0;
      let totalRequired = 0;

      subjects.forEach(subj => {
        let subjectAvgForSort = null;
        let cell = "";
        let subjDone = 0;
        let subjRequired = 0;

        if (grouped[subj]) {
          for (let type in grouped[subj]) {
            let marks = grouped[subj][type];

            let selectEl = document.querySelector(`.labCountSelect[data-subject="${subj}"]`);
            let totalLabs = selectEl ? parseInt(selectEl.value) : 0;

            let doneLabs = marks.length;

            let percent = totalLabs > 0 ? (doneLabs / totalLabs) * 100 : 0; // depricated
            if (type === "ЛР" || type === "ПЗ") {
              subjDone += Math.min(doneLabs, totalLabs);
              subjRequired += totalLabs;
              totalDone += Math.min(doneLabs, totalLabs);
              totalRequired += totalLabs;
            
              let avg = calcAverage(marks);
              if (avg !== null) {
                subjectAvgForSort = avg;
              }
            
              cell += marks.length > 0
                ? `(${type}): ${marks.join(", ")} — ${doneLabs}/${totalLabs}
                   ${avg ? `<span style="color:red;">(ср: ${avg})</span>` : ""}
                   <br>`
                : `(${type}): — 0/${totalLabs}<br>`;
            }
          }
          if (subjRequired > 0) {
            let subjPercent = (subjDone / subjRequired) * 100;
            cell += `<br> <i>Сдано на ${subjPercent.toFixed(1)}%</i> <br>`;
          }
        }

        row += `<td data-avg="${subjectAvgForSort ?? ''}">${cell}</td>`;

      });
      
      let avgPercent = totalRequired > 0 ? ((totalDone / totalRequired) * 100).toFixed(1) : "0.0";
      row += `<td><b>${avgPercent}%</b></td>`;


      row += "</tr>";
      tbody.innerHTML += row;

  });

  document.querySelectorAll(".labCountSelect").forEach(sel => {
    sel.addEventListener("change", (e) => {
      let subject = e.target.dataset.subject;
      let val = parseInt(e.target.value);
      subjectLabs[subject] = val;
      buildTable(cachedStudents, cachedIds);
    });
  });

  document.querySelectorAll(".sortable-subject").forEach(th => {
    th.onclick = () => {
      let subject = th.dataset.subject;
  
      if (currentSort.subject === subject) {
        currentSort.direction *= -1;
      } else {
        currentSort.subject = subject;
        currentSort.direction = -1; // сначала по убыванию
      }
  
      sortTableBySubjectAvg(subject, currentSort.direction);
      updateSortIndicators();
    };
  });
  

}

document.getElementById("groupSelect").addEventListener("change", (e) => {
  let groupValue = e.target.value;

  let ids = [];

  if (groupValue.toString() === "0") {
    ids = studentsInfo.map(s => s.id);
  } else if (groupValue) {
    ids = studentsInfo.filter(s => s.group === Number(groupValue)).map(s => s.id);
  }

  document.getElementById("studentIds").value = ids.join(", ");
});

function downloadExcel() {
  console.log("asd");
  const table = document.getElementById("resultsTable");

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.table_to_sheet(table);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Оценки");

  XLSX.writeFile(workbook, "ratings.xlsx");
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;с
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  doc.text("Таблица оценок", 14, 15);

  doc.autoTable({
    html: "#resultsTable",
    startY: 20,
    styles: { fontSize: 8 }
  });

  doc.save("ratings.pdf");
}

function sortTableBySubjectAvg(subject, direction) {
  const table = document.getElementById("resultsTable");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  const subjectIndex = Array.from(
    table.querySelectorAll("thead th")
  ).findIndex(th => th.dataset.subject === subject);

  rows.sort((a, b) => {
    let aVal = parseFloat(a.children[subjectIndex]?.dataset.avg || -1);
    let bVal = parseFloat(b.children[subjectIndex]?.dataset.avg || -1);

    return (aVal - bVal) * direction;
  });

  rows.forEach(r => tbody.appendChild(r));
}

function updateSortIndicators() {
  document.querySelectorAll(".sort-indicator").forEach(el => el.textContent = "");

  if (!currentSort.subject) return;

  const th = document.querySelector(
    `.sortable-subject[data-subject="${currentSort.subject}"] .sort-indicator`
  );

  if (th) {
    th.textContent = currentSort.direction === 1 ? " ▲" : " ▼";
  }
}
  
