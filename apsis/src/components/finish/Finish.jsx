import React from 'react';
import { jsPDF } from 'jspdf';
import './Finish.css';
import { useState, useEffect } from 'react';
import { tableHeaders, calculateSectionTotal, groupALabels } from './tableData';
import TableSection from './TableSection';

function Finish() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [savedThesis, setSavedThesis] = useState([]);
  const [savedPublications, setSavedPublications] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [savedAwards, setSavedAwards] = useState([]);
  const [, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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

  const getSelectedStaff = () => localStorage.getItem('selectedOption');

  useEffect(() => {
    setSavedProjects(JSON.parse(localStorage.getItem('savedProjects')) || []);
    setSavedThesis(JSON.parse(localStorage.getItem('savedThesis')) || []);
    setSavedPublications(JSON.parse(localStorage.getItem('savedPublications')) || []);
    setSavedArtworks(JSON.parse(localStorage.getItem('savedArtworks')) || []);
    setSavedAwards(JSON.parse(localStorage.getItem('savedAwards')) || []);
    setSavedCourses(JSON.parse(localStorage.getItem('savedCourses')) || []);
  }, []);

  useEffect(() => {
    try {
      const response = localStorage.getItem('userInfo');
      if (response) {
        const parsedData = JSON.parse(response);
        const userData = parsedData?.[0];
        if (userData) setUserInfo(userData);
        else setError('User data not found in array.');
      } else {
        setError('User data not found in localStorage.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data.');
    }
  }, []);

  const capitalizeName = (name) => {
    if (!name) return '';
    const turkishLocale = 'tr-TR';
    return name.charAt(0).toLocaleUpperCase(turkishLocale) + name.slice(1).toLocaleLowerCase(turkishLocale);
  };

  const renderPersonalInfo = () => (
    <TableSection title="GENEL PUANLAMA BİLGİLERİ">
      <tr>
        <td>Adı Soyadı (Ünvanı):</td>
        <td colSpan={3}>
          {userInfo ? `${capitalizeName(userInfo.name)} ${capitalizeName(userInfo.surname)}` : 'Veri Bulunamadı'}
        </td>
      </tr>
      <tr>
        <td>Tarih:</td>
        <td colSpan={3}>{new Date().toLocaleDateString()}</td>
      </tr>
      <tr>
        <td>Başvurulan Birim:</td>
        <td colSpan={3}>Kocaeli Üniversitesi</td>
      </tr>
      <tr>
        <td>Başvurduğu Akademik Kadro:</td>
        <td colSpan={3}>{getSelectedStaff()}</td>
      </tr>
    </TableSection>
  );

  // Belirli bir bölümün satırlarını oluşturur.
  const renderRows = (data, groups, groupProperty, labelCallback, textField, scoreField) =>
    groups.map(group => {
      const groupData = data.filter(item => item[groupProperty] === group);
      if (groupData.length === 0) {
        return (
          <tr key={group}>
            <td>{labelCallback(group)}</td>
            <td>-</td>
            <td>-</td>
          </tr>
        );
      }
      return groupData.map((item, index) => (
        <tr key={`${group}-${index}`}>
          {index === 0 && <td rowSpan={groupData.length}>{labelCallback(group)}</td>}
          <td>{item[textField]}</td>
          <td>{Number(item[scoreField]).toFixed(2)}</td>
        </tr>
      ));
    });

  // Ortak parametrelerle bir TableSection oluşturan yardımcı fonksiyon.
  const renderSection = ({ title, subtitle, headers, data, groups, groupProperty, label, textField, scoreField, sectionCode }) => (
    <TableSection
      title={title}
      subtitle={subtitle}
      headers={headers}
      sectionTotal={calculateSectionTotal(data, sectionCode)}
    >
      {renderRows(data, groups, groupProperty, label, textField, scoreField)}
    </TableSection>
  );

  // Bölüm yapılandırmaları
  const sections = [
    {
      key: 'publications',
      title: tableHeaders.A.title,
      subtitle: tableHeaders.A.subtitle,
      headers: tableHeaders.A.columnHeaders,
      data: savedPublications,
      groups: ['A1','A2','A3','A4','A5','A6','A7','A8','A9'],
      groupProperty: 'groupAuto',
      label: group => `${group}) ${groupALabels[parseInt(group.slice(1)) - 1]}`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'A'
    },
    {
      key: 'thesis',
      title: tableHeaders.F.title,
      subtitle: tableHeaders.F.subtitle,
      headers: tableHeaders.F.columnHeaders,
      data: savedThesis,
      groups: ['F1','F2','F3','F4'],
      groupProperty: 'groupAuto',
      label: group => `${group}) Tez Yöneticiliği`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'F'
    },
    {
      key: 'courses',
      title: tableHeaders.E.title,
      subtitle: tableHeaders.E.subtitle,
      headers: tableHeaders.E.columnHeaders,
      data: savedCourses,
      groups: ['E1','E2','E3','E4'],
      groupProperty: 'group',
      label: group => `${group}) Ders`,
      textField: 'course_name',
      scoreField: 'score',
      sectionCode: 'E'
    },
    {
      key: 'projects',
      title: 'H. ARAŞTIRMA PROJELERİ',
      subtitle: undefined,
      headers: ['', 'Projenin Adı, Proje Numarası, Projenin Yürütüldüğü Kurumun Adı, Yılı', 'Puan'],
      data: savedProjects,
      groups: Array.from({ length: 27 }, (_, i) => `H${i + 1}`),
      groupProperty: 'group',
      label: group => `${group}) Proje`,
      textField: 'projectName',
      scoreField: 'score',
      sectionCode: 'H'
    },
    {
      key: 'artworks',
      title: 'L. SANAT VE TASARIM ALANLARI',
      subtitle: '(Kurumsal ve Uygulama Alanları)',
      headers: ['', 'Faaliyet Adı, Yılı', 'Puan'],
      data: savedArtworks,
      groups: Array.from({ length: 16 }, (_, i) => `L${i + 1}`),
      groupProperty: 'grup_adi',
      label: group => `${group}) Sanatsal Faaliyet`,
      textField: 'title',
      scoreField: 'score',
      sectionCode: 'L'
    },
    {
      key: 'awards',
      title: 'J. ÖDÜLLER',
      subtitle: undefined,
      headers: ['', 'Ödülün Veren Kurul/Kurumun Adı, Yılı', 'Puan'],
      data: savedAwards,
      groups: Array.from({ length: 19 }, (_, i) => `J${i + 1}`),
      groupProperty: 'groupAuto',
      label: group => `${group}) Ödül`,
      textField: 'title',
      scoreField: 'scoreAuto',
      sectionCode: 'J'
    }
  ];

  return (
    <div className='finish-main'>
      <div className='table-container'>
        {renderPersonalInfo()}
        {sections.map(section => (
          <React.Fragment key={section.key}>
            {renderSection(section)}
          </React.Fragment>
        ))}
      </div>
      <button className='finish-button' onClick={downloadPDF}>İndir</button>
    </div>
  );
}

export default Finish;