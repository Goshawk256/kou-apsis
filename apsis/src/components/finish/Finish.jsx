import { jsPDF } from 'jspdf';
import './Finish.css';
import { useState, useEffect } from 'react';
import { tableHeaders, calculateSectionTotal } from './tableData';
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
      overflow: element.style.overflow,
    };

    element.style.height = `${element.scrollHeight}px`;
    element.style.overflow = 'visible';

    doc.html(element, {
      callback: function (doc) {
        element.style.height = originalStyles.height;
        element.style.overflow = originalStyles.overflow;
        doc.save('basvuru-content.pdf');
      },
      x: 0,
      y: 10,
      html2canvas: {
        scale: 0.174,
        width: element.scrollWidth,
        height: element.scrollHeight,
      },
    });
  };

  const getSelectedStaff = () => {
    return localStorage.getItem('selectedOption');
  };

  useEffect(() => {
    setSavedProjects(JSON.parse(localStorage.getItem('savedProjects')) || []);
    setSavedThesis(JSON.parse(localStorage.getItem('savedThesis')) || []);
    setSavedPublications(JSON.parse(localStorage.getItem('savedPublications')) || []);
    setSavedArtworks(JSON.parse(localStorage.getItem('savedArtworks')) || []);
    setSavedAwards(JSON.parse(localStorage.getItem('savedAwards')) || []);
    setSavedCourses(JSON.parse(localStorage.getItem('savedCourses')) || []);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      try {
        const response = localStorage.getItem('userInfo');
        if (response) {
          const parsedData = JSON.parse(response);
          const userInfoData = parsedData?.[0];
          if (userInfoData) {
            setUserInfo(userInfoData);
          } else {
            setError('User data not found in array.');
          }
        } else {
          setError('User data not found in localStorage.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data.');
      }
    };

    fetchData();
  }, []);

  const capitalizeName = (name) => {
    if (!name) return '';
    const turkishLocale = 'tr-TR';
    return name.charAt(0).toLocaleUpperCase(turkishLocale) +
           name.slice(1).toLocaleLowerCase(turkishLocale);
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

  const renderPublicationsSection = () => (
    <TableSection 
      title={tableHeaders.A.title}
      subtitle={tableHeaders.A.subtitle}
      headers={tableHeaders.A.columnHeaders}
      sectionTotal={calculateSectionTotal(savedPublications, 'A')}
    >
      {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'].map((group) => {
        const groupData = savedPublications.filter(item => item.groupAuto === group);
        if (groupData.length === 0) {
          return (
            <tr key={group}>
              <td>{`${group}) SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale`}</td>
              <td>yok</td>
              <td>-</td>
            </tr>
          );
        }
        return groupData.map((item, index) => (
          <tr key={`${group}-${index}`}>
            {index === 0 && <td rowSpan={groupData.length}>{`${group}) SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale`}</td>}
            <td>{item.title}</td>
            <td>{item.scoreAuto.toFixed(2)}</td>
          </tr>
        ));
      })}
    </TableSection>
  );

  const renderThesisSection = () => (
    <TableSection
      title={tableHeaders.F.title}
      subtitle={tableHeaders.F.subtitle}
      headers={tableHeaders.F.columnHeaders}
      sectionTotal={calculateSectionTotal(savedThesis, 'F')}
    >
      {['F1', 'F2', 'F3', 'F4'].map((group) => {
        const groupData = savedThesis.filter(item => item.groupAuto === group);
        if (groupData.length === 0) {
          return (
            <tr key={group}>
              <td>{`${group}) Tez Yöneticiliği`}</td>
              <td>yok</td>
              <td>-</td>
            </tr>
          );
        }
        return groupData.map((item, index) => (
          <tr key={`${group}-${index}`}>
            {index === 0 && <td rowSpan={groupData.length}>{`${group}) Tez Yöneticiliği`}</td>}
            <td>{item.title}</td>
            <td>{item.scoreAuto.toFixed(2)}</td>
          </tr>
        ));
      })}
    </TableSection>
  );

  const renderCoursesSection = () => (
    <TableSection
      title={tableHeaders.E.title}
      subtitle={tableHeaders.E.subtitle}
      headers={tableHeaders.E.columnHeaders}
      sectionTotal={calculateSectionTotal(savedCourses, 'E')}
    >
      {['E1', 'E2', 'E3', 'E4'].map((group) => {
        const groupData = savedCourses.filter(item => item.group === group);
        if (groupData.length === 0) {
          return (
            <tr key={group}>
              <td>{`${group}) Ders`}</td>
              <td>yok</td>
              <td>-</td>
            </tr>
          );
        }
        return groupData.map((item, index) => (
          <tr key={`${group}-${index}`}>
            {index === 0 && <td rowSpan={groupData.length}>{`${group}) Ders`}</td>}
            <td>{item.course_name}</td>
            <td>{item.score.toFixed(2)}</td>
          </tr>
        ));
      })}
    </TableSection>
  );

  const renderProjectsSection = () => (
    <TableSection
      title="H. ARAŞTIRMA PROJELERİ"
      headers={["", "Projenin Adı, Proje Numarası, Projenin Yürütüldüğü Kurumun Adı, Yılı", "Puan"]}
      sectionTotal={calculateSectionTotal(savedProjects, 'H')}
    >
      {Array.from({ length: 27 }, (_, i) => `H${i + 1}`).map((group) => {
        const groupData = savedProjects.filter(item => item.group === group);
        if (groupData.length === 0) {
          return (
            <tr key={group}>
              <td>{`${group}) Proje`}</td>
              <td>yok</td>
              <td>-</td>
            </tr>
          );
        }
        return groupData.map((item, index) => (
          <tr key={`${group}-${index}`}>
            {index === 0 && <td rowSpan={groupData.length}>{`${group}) Proje`}</td>}
            <td>{item.projectName}</td>
            <td>{item.score.toFixed(2)}</td>
          </tr>
        ));
      })}
    </TableSection>
  );

  const renderArtworksSection = () => (
    <TableSection
      title="L. SANAT VE TASARIM ALANLARI"
      subtitle="(Kurumsal ve Uygulama Alanları)"
      headers={["", "Faaliyet Adı, Yılı", "Puan"]}
      sectionTotal={calculateSectionTotal(savedArtworks, 'L')}
    >
      {Array.from({ length: 16 }, (_, i) => `L${i + 1}`).map((group) => {
        const groupData = savedArtworks.filter(item => item.grup_adi === group);
        if (groupData.length === 0) {
          return (
            <tr key={group}>
              <td>{`${group}) Sanatsal Faaliyet`}</td>
              <td>yok</td>
              <td>-</td>
            </tr>
          );
        }
        return groupData.map((item, index) => (
          <tr key={`${group}-${index}`}>
            {index === 0 && <td rowSpan={groupData.length}>{`${group}) Sanatsal Faaliyet`}</td>}
            <td>{item.title}</td>
            <td>{item.score.toFixed(2)}</td>
          </tr>
        ));
      })}
    </TableSection>
  );

  const renderAwardsSection = () => (
    <TableSection
      title="J. ÖDÜLLER"
      headers={["", "Ödülün Veren Kurul/Kurumun Adı, Yılı", "Puan"]}
      sectionTotal={calculateSectionTotal(savedAwards, 'J')}
    >
      {Array.from({ length: 19 }, (_, i) => `J${i + 1}`).map((group) => {
        const groupData = savedAwards.filter(item => item.groupAuto === group);
        if (groupData.length === 0) {
          return (
            <tr key={group}>
              <td>{`${group}) Ödül`}</td>
              <td>yok</td>
              <td>-</td>
            </tr>
          );
        }
        return groupData.map((item, index) => (
          <tr key={`${group}-${index}`}>
            {index === 0 && <td rowSpan={groupData.length}>{`${group}) Ödül`}</td>}
            <td>{item.title}</td>
            <td>{item.scoreAuto.toFixed(2)}</td>
          </tr>
        ));
      })}
    </TableSection>
  );

  return (
    <div className='finish-main'>
      <div className='table-container'>
        {renderPersonalInfo()}
        {renderPublicationsSection()}
        {renderThesisSection()}
        {renderCoursesSection()}
        {renderProjectsSection()}
        {renderArtworksSection()}
        {renderAwardsSection()}
      </div>
      <button className='finish-button' onClick={downloadPDF}>İndir</button>
    </div>
  );
}

export default Finish;
