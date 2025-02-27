import { useState, useEffect } from "react";
import "./Finish.css";
import pdfMake from "pdfmake/build/pdfmake";
import All_Url from "../../../../url";
import axios from "axios";
import "pdfmake/build/vfs_fonts";

import {
  tableHeaders,
  calculateSectionTotal,
  groupALabels,
  groupBLabels,
  groupCLabels,
  groupDLabels,
  groupELabels,
  groupFLabels,
  groupGLabels,
  groupHLabels,
} from "./tableData";
import TableSection from "./TableSection";

function Finish({ onSelect }) {
  const [data, setData] = useState({
    projects: [],
    thesis: [],
    publications: [],
    courses: [],
    artworks: [],
    awards: [],
    patents: [],
    userInfo: null,
  });
  const [sendData, setSendData] = useState([]);

  const convertSectionToTableData = (section) => {
    const rows = [];

    // Başlık satırı
    rows.push([
      {
        text: section.title,
        colSpan: 3,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {},
    ]);

    if (section.subtitle) {
      rows.push([
        {
          text: section.subtitle,
          colSpan: 3,
          style: "tableSubHeader",
          alignment: "center",
        },
        {},
        {},
      ]);
    }

    // Sütun başlıkları
    rows.push(
      section.headers.map((header) => ({
        text: header,
        style: "columnHeader",
      }))
    );

    // Her grup için veri satırları
    section.groups.forEach((expectedGroup) => {
      const matchingItems = section.data.filter(
        (item) => (item.groupAuto || item.group) === expectedGroup
      );

      if (matchingItems.length === 0) {
        // Eğer bu grup için veri yoksa boş satır ekle
        rows.push([
          {
            text: `${expectedGroup}) ${section.labelCallback(expectedGroup)}`,
            style: "groupHeader",
          },
          { text: "", style: "emptyData" },
          { text: "0", alignment: "center" },
        ]);
      } else {
        matchingItems.forEach((item, index) => {
          if (index === 0) {
            rows.push([
              {
                text: `${expectedGroup}) ${section.labelCallback(
                  expectedGroup
                )}`,
                style: "groupHeader",
              },
              { text: section.textField(item) },
              {
                text: item[section.scoreField]?.toString() || "0",
                alignment: "center",
              },
            ]);
          } else {
            rows.push([
              { text: "", style: "groupHeader" },
              { text: section.textField(item) },
              {
                text: item[section.scoreField]?.toString() || "0",
                alignment: "center",
              },
            ]);
          }
        });
      }
    });

    // Toplam satırı
    rows.push([
      { text: "TOPLAM", colSpan: 2, style: "totalRow", alignment: "right" },
      {},
      {
        text: calculateSectionTotal(
          section.data,
          section.sectionCode
        ).toString(),
        style: "totalRow",
        alignment: "center",
      },
    ]);

    return rows;
  };

  const downloadPDF = () => {
    const userInfo = data.userInfo
      ? `${capitalizeName(data.userInfo.name)} ${capitalizeName(
          data.userInfo.surname
        )}`
      : "Veri Bulunamadı";

    const docDefinition = {
      pageSize: "A4",
      pageMargins: [30, 30, 30, 50],
      footer: (currentPage, pageCount) => ({
        text: `Sayfa ${currentPage} / ${pageCount}`,
        alignment: "center",
        margin: [0, 20],
        fontSize: 9,
        color: "#666",
      }),
      compress: true,
      info: {
        title: "Başvuru Formu",
        author: "KOÜ APSIS",
        subject: "Akademik Başvuru Formu",
      },
      content: [
        {
          text: "GENEL PUANLAMA BİLGİLERİ",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            widths: ["*"],
            body: [
              [{ text: `İsim: ${userInfo}`, style: "userInfo" }],
              [
                {
                  text: `Tarih: ${new Date().toLocaleDateString("tr-TR")}`,
                  style: "userInfo",
                },
              ],
              [{ text: `Kurum: Kocaeli Üniversitesi`, style: "userInfo" }],
              [
                {
                  text: `Pozisyon: ${localStorage.getItem("selectedOption")}`,
                  style: "userInfo",
                },
              ],
            ],
          },
          margin: [0, 0, 0, 20],
        },
        ...sections.map((section) => ({
          table: {
            widths: ["30%", "50%", "20%"],
            body: convertSectionToTableData(section),
            headerRows: 3,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => "#aaa",
            vLineColor: () => "#aaa",
            paddingLeft: () => 4,
            paddingRight: () => 4,
            paddingTop: () => 3,
            paddingBottom: () => 3,
            fillColor: (rowIndex, node) =>
              rowIndex === 0
                ? "#f0f0f0"
                : rowIndex === 1 && node.table.headerRows > 1
                ? "#f7f7f7"
                : null,
          },
          margin: [0, 0, 0, 20],
        })),
      ],
      styles: {
        header: { fontSize: 12, bold: true },
        userInfo: { fontSize: 9, margin: [0, 4] },
        tableHeader: {
          fontSize: 10,
          bold: true,
          fillColor: "#f0f0f0",
          margin: [0, 4],
        },
        tableSubHeader: {
          fontSize: 9,
          italics: true,
          fillColor: "#f7f7f7",
          margin: [0, 2],
        },
        columnHeader: {
          fontSize: 8,
          bold: true,
          fillColor: "#f5f5f5",
          margin: [0, 2],
        },
        groupHeader: { fontSize: 8, bold: true },
        emptyData: { fontSize: 8, italics: true, color: "#666" },
        totalRow: { fontSize: 9, bold: true, fillColor: "#f0f0f0" },
      },
      defaultStyle: { fontSize: 8, lineHeight: 1.2 },
      pageOrientation: "portrait",
      pageBreakBefore: (currentNode) =>
        currentNode.style &&
        currentNode.style.indexOf("header") !== -1 &&
        currentNode.pageNumbers.length > 1,
    };
    // pdfMake.createPdf(docDefinition).download("basvuru-content.pdf");
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      if (!blob) {
        console.error("PDF blob oluşturulamadı!");
        return;
      }
      console.log("Oluşturulan PDF Blob:", blob);
      handleApplication(blob);
    });
  };

  useEffect(() => {
    const loadData = () => {
      setData({
        projects: JSON.parse(localStorage.getItem("savedProjects")) || [],
        thesis: JSON.parse(localStorage.getItem("savedThesis")) || [],
        publications:
          JSON.parse(localStorage.getItem("savedPublications")) || [],
        artworks: JSON.parse(localStorage.getItem("savedArtworks")) || [],
        awards: JSON.parse(localStorage.getItem("savedAwards")) || [],
        courses: JSON.parse(localStorage.getItem("savedCourses")) || [],
        patents: JSON.parse(localStorage.getItem("savedPatents")) || [],
        userInfo: JSON.parse(localStorage.getItem("userInfo"))?.[0] || null,
      });
    };

    try {
      loadData();
    } catch (err) {
      console.error("Error loading data:", err);
    }

    const savedProjects =
      JSON.parse(localStorage.getItem("savedProjects")) || [];
    const savedThesis = JSON.parse(localStorage.getItem("savedThesis")) || [];
    const savedPublications =
      JSON.parse(localStorage.getItem("savedPublications")) || [];
    const savedAwards = JSON.parse(localStorage.getItem("savedAwards")) || [];
    const savedArtworks =
      JSON.parse(localStorage.getItem("savedArtworks")) || [];
    const savedLessons = JSON.parse(localStorage.getItem("savedCourses")) || [];
    const basvuruTipi = localStorage.getItem("basvuruTipi") || ""; // Null dönerse boş string kullan
    const secilmisIlan = localStorage.getItem("secilmisIlan");

    let data = {
      applicationType: basvuruTipi,
      title: localStorage.getItem("selectedOption"),
      date: new Date().toISOString(), // Gerekirse toLocaleString() kullanabilirsin
    };

    if (basvuruTipi === "Scientific" && secilmisIlan) {
      data.positionAnnouncementId = secilmisIlan;
    }

    if (savedPublications.length >= 0) {
      data.articles =
        savedPublications.map((item) => ({ publicationId: item.id })) || [];
    }
    if (savedProjects.length >= 0) {
      data.projects =
        savedProjects.map((item) => ({ projectId: item.id })) || [];
    }
    if (savedThesis.length >= 0) {
      data.advisingThesis =
        savedThesis.map((item) => ({ advisingThesisId: item.id })) || [];
    }
    if (savedLessons.length >= 0) {
      data.lessons = savedLessons.map((item) => ({ lessonId: item.id })) || [];
    }
    if (savedAwards.length >= 0) {
      data.awards = savedAwards.map((item) => ({ awardId: item.id })) || [];
    }
    if (savedArtworks.length >= 0) {
      data.artworks =
        savedArtworks.map((item) => ({ artworkId: item.id })) || [];
    }

    setSendData(data);
  }, []);
  const handleApplication = async (pdfBlob) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Oturum açılmadı!");
      return;
    }

    try {
      const formData = new FormData();

      if (!sendData) {
        console.error("Gönderilecek veri eksik!");
        return;
      }

      formData.append("data", JSON.stringify(sendData));
      formData.append("file", pdfBlob);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(
        `${All_Url.api_base_url}/academic/add-application`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Başvuru tamamlandı!");
      return response.data.success;
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };

  const capitalizeName = (name) => {
    if (!name) return "";
    return (
      name.charAt(0).toLocaleUpperCase("tr-TR") +
      name.slice(1).toLocaleLowerCase("tr-TR")
    );
  };

  const renderPersonalInfo = () => (
    <TableSection
      title="GENEL PUANLAMA BİLGİLERİ"
      data={[
        {
          name: data.userInfo
            ? `${capitalizeName(data.userInfo.name)} ${capitalizeName(
                data.userInfo.surname
              )}`
            : "Veri Bulunamadı",
          date: new Date().toLocaleDateString(),
          institution: "Kocaeli Üniversitesi",
          position: localStorage.getItem("selectedOption"),
        },
      ]}
      groups={["info"]}
      groupProperty="group"
      labelCallback={() => ""}
      textField="name"
    />
  );

  const sections = [
    {
      key: "publications",
      title: tableHeaders.A.title,
      subtitle: tableHeaders.A.subtitle,
      headers: tableHeaders.A.columnHeaders,
      data: data.publications,
      groups: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
      groupProperty: "groupAuto",
      labelCallback: (group) => groupALabels[parseInt(group.slice(1)) - 1],
      textField: (item) => {
        if (!item.title) return "";
        return `${item.authors || ""}, ${item.title}, ${
          item.journalName || ""
        }, ${item.volume || ""}, ${item.pages || ""}, ${item.year || ""}`;
      },
      scoreField: "scoreAuto",
      sectionCode: "A",
    },
    {
      key: "conferences",
      title: tableHeaders.B.title,
      subtitle: tableHeaders.B.subtitle,
      headers: tableHeaders.B.columnHeaders,
      data: data.publications,
      groups: Array.from({ length: 12 }, (_, i) => `B${i + 1}`),
      groupProperty: "groupAuto",
      labelCallback: (group) => groupBLabels[parseInt(group.slice(1)) - 1],
      textField: (item) => {
        if (!item.title) return "";
        return `${item.authors || ""}, ${item.title}, ${
          item.conferenceName || ""
        }, ${item.location || ""}, ${item.pages || ""}, ${item.date || ""}`;
      },
      scoreField: "scoreAuto",
      sectionCode: "B",
    },
    {
      key: "books",
      title: tableHeaders.C.title,
      subtitle: tableHeaders.C.subtitle,
      headers: tableHeaders.C.columnHeaders,
      data: data.publications,
      groups: Array.from({ length: 8 }, (_, i) => `C${i + 1}`),
      groupProperty: "groupAuto",
      labelCallback: (group) => groupCLabels[parseInt(group.slice(1)) - 1],
      textField: (item) => {
        if (!item.title) return "";
        return `${item.authors || ""}, ${item.title}, ${
          item.publisher || " "
        }, ${item.edition || ""} ${item.location || ""}, ${item.year || ""}`;
      },
      scoreField: "scoreAuto",
      sectionCode: "C",
    },
    {
      key: "citations",
      title: tableHeaders.D.title,
      subtitle: tableHeaders.D.subtitle,
      headers: tableHeaders.D.columnHeaders,
      data: data.publications,
      groups: Array.from({ length: 4 }, (_, i) => `D${i + 1}`),
      groupProperty: "groupAuto",
      labelCallback: (group) => groupDLabels[parseInt(group.slice(1)) - 1],
      textField: (item) => {
        if (!item.title) return "";
        return `${item.citedWork || ""}, Atıf sayısı: ${
          item.citationCount || "0"
        }`;
      },
      scoreField: "scoreAuto",
      sectionCode: "D",
    },
    {
      key: "courses",
      title: tableHeaders.E.title,
      subtitle: tableHeaders.E.subtitle,
      headers: tableHeaders.E.columnHeaders,
      data: data.courses,
      groups: ["E1", "E2", "E3", "E4"],
      groupProperty: "group",
      labelCallback: (group) => groupELabels[parseInt(group.slice(1)) - 1],
      textField: (item) => {
        if (!item.course_name) return "";
        return `${item.course_name}, ${item.program || ""}, ${
          item.semester || ""
        }, ${item.year || ""}`;
      },
      scoreField: "score",
      sectionCode: "E",
    },
    {
      key: "thesis",
      title: tableHeaders.F.title,
      subtitle: tableHeaders.F.subtitle,
      headers: tableHeaders.F.columnHeaders,
      data: data.thesis,
      groups: ["F1", "F2", "F3", "F4"],
      groupProperty: "groupAuto",
      labelCallback: (group) => groupFLabels[parseInt(group.slice(1)) - 1],
      textField: (item) => {
        if (!item.title) return "";
        return `${item.studentName || ""}, ${item.title}, ${
          item.institute || ""
        }, ${item.year || ""}`;
      },
      scoreField: "scoreAuto",
      sectionCode: "F",
    },
    {
      key: "patents",
      title: tableHeaders.G.title,
      subtitle: tableHeaders.G.subtitle,
      headers: tableHeaders.G.columnHeaders,
      data: data.patents,
      groups: Array.from({ length: 8 }, (_, i) => `G${i + 1}`),
      groupProperty: "group",
      labelCallback: (group) => groupGLabels[parseInt(group.slice(1)) - 1],
      textField: (item) => {
        if (!item.patentName) return "";
        return `${item.patentName}, ${item.year || ""}`;
      },
      scoreField: "score",
      sectionCode: "G",
    },
    {
      key: "projects",
      title: tableHeaders.H.title,
      subtitle: tableHeaders.H.subtitle,
      headers: tableHeaders.H.columnHeaders,
      data: data.projects,
      groups: Array.from({ length: 27 }, (_, i) => `H${i + 1}`),
      groupProperty: "group",
      labelCallback: (group) => groupHLabels[parseInt(group.slice(1)) - 1],
      textField: (item) => {
        if (!item.projectName) return "";
        return `${item.projectName}, ${item.projectNumber || ""}, ${
          item.institution || ""
        }, ${item.year || ""}`;
      },
      scoreField: "score",
      sectionCode: "H",
    },
  ];

  return (
    <div className="finish-main">
      <div className="table-container">
        {renderPersonalInfo()}
        {sections.map((section) => (
          <TableSection
            key={section.key}
            {...section}
            sectionTotal={calculateSectionTotal(
              section.data,
              section.sectionCode
            )}
          />
        ))}
      </div>
      <div className="finish-buttons">
        <button
          onClick={() => {
            downloadPDF();
            onSelect("Başvuru");
          }}
          className="finish-button"
        >
          Başvuruyu Tamala
        </button>
      </div>
    </div>
  );
}

export default Finish;
