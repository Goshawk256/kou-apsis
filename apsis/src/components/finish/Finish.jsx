import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import './Finish.css';
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
  groupHLabels 
} from './tableData';
import TableSection from './TableSection';

function Finish() {
  const [data, setData] = useState({
    projects: [],
    thesis: [],
    publications: [],
    courses: [],
    artworks: [],
    awards: [],
    patents: [],
    userInfo: null
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    const element = document.querySelector('.table-container');
    const originalStyles = {
      height: element.style.height,
      overflow: element.style.overflow
    };
    element.style.height = `${element.scrollHeight}px`;
    element.style.overflow = 'visible';
    doc.html(element, {
      callback: function(doc) {
        element.style.height = originalStyles.height;
        element.style.overflow = originalStyles.overflow;
        doc.save('basvuru-content.pdf');
      },
      x: 0,
      y: 10,
      html2canvas: {
        scale: 0.174,
        width: element.scrollWidth,
        height: element.scrollHeight
      }
    });
  };

  useEffect(() => {
    const loadData = () => {
      setData({
        projects: JSON.parse(localStorage.getItem('savedProjects')) || [],
        thesis: JSON.parse(localStorage.getItem('savedThesis')) || [],
        publications: JSON.parse(localStorage.getItem('savedPublications')) || [],
        artworks: JSON.parse(localStorage.getItem('savedArtworks')) || [],
        awards: JSON.parse(localStorage.getItem('savedAwards')) || [],
        courses: JSON.parse(localStorage.getItem('savedCourses')) || [],
        patents: JSON.parse(localStorage.getItem('savedPatents')) || [],
        userInfo: JSON.parse(localStorage.getItem('userInfo'))?.[0] || null
      });
    };

    try {
      loadData();
    } catch (err) {
      console.error('Error loading data:', err);
    }
  }, []);

  const capitalizeName = (name) => {
    if (!name) return '';
    return name.charAt(0).toLocaleUpperCase('tr-TR') + name.slice(1).toLocaleLowerCase('tr-TR');
  };

  const renderPersonalInfo = () => (
    <TableSection
      title="GENEL PUANLAMA BİLGİLERİ"
      data={[{
        name: data.userInfo ? `${capitalizeName(data.userInfo.name)} ${capitalizeName(data.userInfo.surname)}` : 'Veri Bulunamadı',
        date: new Date().toLocaleDateString(),
        institution: 'Kocaeli Üniversitesi',
        position: localStorage.getItem('selectedOption')
      }]}
      groups={['info']}
      groupProperty="group"
      labelCallback={() => ''}
      textField="name"
    />
  );

  const sections = [
    {
      key: 'publications',
      title: tableHeaders.A.title,
      subtitle: tableHeaders.A.subtitle,
      headers: tableHeaders.A.columnHeaders,
      data: data.publications,
      groups: ['A1','A2','A3','A4','A5','A6','A7','A8','A9'],
      groupProperty: 'groupAuto',
      labelCallback: group => `${group}) ${groupALabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'A'
    },
    {
      key: 'conferences',
      title: tableHeaders.B.title,
      subtitle: tableHeaders.B.subtitle,
      headers: tableHeaders.B.columnHeaders,
      data: data.publications,
      groups: Array.from({ length: 12 }, (_, i) => `B${i + 1}`),
      groupProperty: 'groupAuto',
      labelCallback: group => `${group}) ${groupBLabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'B'
    },
    {
      key: 'books',
      title: tableHeaders.C.title,
      subtitle: tableHeaders.C.subtitle,
      headers: tableHeaders.C.columnHeaders,
      data: data.publications,
      groups: Array.from({ length: 8 }, (_, i) => `C${i + 1}`),
      groupProperty: 'groupAuto',
      labelCallback: group => `${group}) ${groupCLabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'C'
    },
    {
      key: 'citations',
      title: tableHeaders.D.title,
      subtitle: tableHeaders.D.subtitle,
      headers: tableHeaders.D.columnHeaders,
      data: data.publications,
      groups: Array.from({ length: 4 }, (_, i) => `D${i + 1}`),
      groupProperty: 'groupAuto',
      labelCallback: group => `${group}) ${groupDLabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'D'
    },
    {
      key: 'courses',
      title: tableHeaders.E.title,
      subtitle: tableHeaders.E.subtitle,
      headers: tableHeaders.E.columnHeaders,
      data: data.courses,
      groups: ['E1','E2','E3','E4'],
      groupProperty: 'group',
      labelCallback: group => `${group}) ${groupELabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'course_name',
      scoreField: 'score',
      sectionCode: 'E'
    },
    {
      key: 'thesis',
      title: tableHeaders.F.title,
      subtitle: tableHeaders.F.subtitle,
      headers: tableHeaders.F.columnHeaders,
      data: data.thesis,
      groups: ['F1','F2','F3','F4'],
      groupProperty: 'groupAuto',
      labelCallback: group => `${group}) ${groupFLabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'F'
    },
    {
      key: 'patents',
      title: tableHeaders.G.title,
      subtitle: tableHeaders.G.subtitle,
      headers: tableHeaders.G.columnHeaders,
      data: data.patents,
      groups: Array.from({ length: 8 }, (_, i) => `G${i + 1}`),
      groupProperty: 'group',
      labelCallback: group => `${group}) ${groupGLabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'patentName',
      scoreField: 'score',
      sectionCode: 'G'
    },
    {
      key: 'projects',
      title: tableHeaders.H.title,
      subtitle: tableHeaders.H.subtitle,
      headers: tableHeaders.H.columnHeaders,
      data: data.projects,
      groups: Array.from({ length: 27 }, (_, i) => `H${i + 1}`),
      groupProperty: 'group',
      labelCallback: group => `${group}) ${groupHLabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'projectName',
      scoreField: 'score',
      sectionCode: 'H'
    }
    // TODO: L ve J bölümleri için tableData.js'de groupLabels tanımlamaları yapılacak
    /*
    {
      key: 'artworks',
      title: 'L. SANAT VE TASARIM ALANLARI',
      subtitle: '(Kurumsal ve Uygulama Alanları)',
      headers: ['', 'Faaliyet Adı, Yılı', 'Puan'],
      data: data.artworks,
      groups: Array.from({ length: 16 }, (_, i) => `L${i + 1}`),
      groupProperty: 'grup_adi',
      labelCallback: group => `${group}) Sanatsal Faaliyet`,
      textField: 'title',
      scoreField: 'score',
      sectionCode: 'L'
    },
    {
      key: 'awards',
      title: 'J. ÖDÜLLER',
      headers: ['', 'Ödülün Veren Kurul/Kurumun Adı, Yılı', 'Puan'],
      data: data.awards,
      groups: Array.from({ length: 19 }, (_, i) => `J${i + 1}`),
      groupProperty: 'groupAuto',
      labelCallback: group => `${group}) Ödül`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'J'
    }
    */
  ];

  return (
    <div className='finish-main'>
      <div className='table-container'>
        {renderPersonalInfo()}
        {sections.map(section => (
          <TableSection
            key={section.key}
            {...section}
            sectionTotal={calculateSectionTotal(section.data, section.sectionCode)}
          />
        ))}
      </div>
      <button className='finish-button' onClick={downloadPDF}>İndir</button>
    </div>
  );
}

export default Finish;