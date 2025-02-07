import { useState, useEffect } from 'react';
import './Finish.css';
import pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
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

  const convertSectionToTableData = (section) => {
    const rows = [];
    
    // Başlık satırı
    rows.push([
      { text: section.title, colSpan: 3, style: 'tableHeader', alignment: 'center' },
      {}, {}
    ]);

    if (section.subtitle) {
      rows.push([
        { text: section.subtitle, colSpan: 3, style: 'tableSubHeader', alignment: 'center' },
        {}, {}
      ]);
    }

    // Sütun başlıkları
    rows.push(section.headers.map(header => ({
      text: header,
      style: 'columnHeader'
    })));

    // Veri satırları
    let currentGroup = '';
    section.data
      .filter(item => item.groupAuto?.startsWith(section.sectionCode) || item.group?.startsWith(section.sectionCode))
      .forEach(item => {
        const group = item.groupAuto || item.group;
        if (group !== currentGroup) {
          currentGroup = group;
          const label = section.labelCallback(group);
          rows.push([
            { text: label, style: 'groupHeader' },
            { text: section.textField(item) },
            { text: item[section.scoreField]?.toString() || '0', alignment: 'center' }
          ]);
        } else {
          rows.push([
            { text: '', style: 'groupHeader' },
            { text: section.textField(item) },
            { text: item[section.scoreField]?.toString() || '0', alignment: 'center' }
          ]);
        }
      });

    // Toplam satırı
    rows.push([
      { text: 'TOPLAM', colSpan: 2, style: 'totalRow', alignment: 'right' },
      {},
      { text: calculateSectionTotal(section.data, section.sectionCode).toString(), style: 'totalRow', alignment: 'center' }
    ]);

    return rows;
  };

  const downloadPDF = () => {
    const userInfo = data.userInfo ?
      `${capitalizeName(data.userInfo.name)} ${capitalizeName(data.userInfo.surname)}` :
      'Veri Bulunamadı';

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [30, 30, 30, 50],
      footer: function(currentPage, pageCount) {
        return {
          text: `Sayfa ${currentPage} / ${pageCount}`,
          alignment: 'center',
          margin: [0, 20],
          fontSize: 9,
          color: '#666'
        };
      },
      compress: true,
      info: {
        title: 'Başvuru Formu',
        author: 'KOÜ APSIS',
        subject: 'Akademik Başvuru Formu'
      },
      content: [
        {
          text: 'GENEL PUANLAMA BİLGİLERİ',
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: `İsim: ${userInfo}`, style: 'userInfo' }],
              [{ text: `Tarih: ${new Date().toLocaleDateString('tr-TR')}`, style: 'userInfo' }],
              [{ text: `Kurum: Kocaeli Üniversitesi`, style: 'userInfo' }],
              [{ text: `Pozisyon: ${localStorage.getItem('selectedOption')}`, style: 'userInfo' }]
            ]
          },
          margin: [0, 0, 0, 20]
        },
        ...sections.map(section => ({
          table: {
            widths: ['30%', '50%', '20%'],
            body: convertSectionToTableData(section),
            headerRows: 3,
            dontBreakRows: true,
            keepWithHeaderRows: 1
          },
          layout: {
            hLineWidth: function() { return 0.5; },
            vLineWidth: function() { return 0.5; },
            hLineColor: function() { return '#aaa'; },
            vLineColor: function() { return '#aaa'; },
            paddingLeft: function() { return 4; },
            paddingRight: function() { return 4; },
            paddingTop: function() { return 3; },
            paddingBottom: function() { return 3; },
            fillColor: function(rowIndex, node) {
              return (rowIndex === 0) ? '#f0f0f0' :
                     (rowIndex === 1 && node.table.headerRows > 1) ? '#f7f7f7' : null;
            }
          },
          margin: [0, 0, 0, 20]
        }))
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true
        },
        userInfo: {
          fontSize: 9,
          margin: [0, 4]
        },
        tableHeader: {
          fontSize: 10,
          bold: true,
          fillColor: '#f0f0f0',
          margin: [0, 4]
        },
        tableSubHeader: {
          fontSize: 9,
          italics: true,
          fillColor: '#f7f7f7',
          margin: [0, 2]
        },
        columnHeader: {
          fontSize: 8,
          bold: true,
          fillColor: '#f5f5f5',
          margin: [0, 2]
        },
        groupHeader: {
          fontSize: 8,
          bold: true
        },
        totalRow: {
          fontSize: 9,
          bold: true,
          fillColor: '#f0f0f0'
        }
      },
      defaultStyle: {
        fontSize: 8,
        lineHeight: 1.2
      },
      pageOrientation: 'portrait',
      pageBreakBefore: function(currentNode) {
        return currentNode.style && currentNode.style.indexOf('header') !== -1 && currentNode.pageNumbers.length > 1;
      }
    };

    pdfMake.createPdf(docDefinition).download('basvuru-content.pdf');
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
      textField: (item) => {
        if (!item.title) return 'Veri girilmemiş';
        return `${item.authors || 'Yazar girilmemiş'}, ${item.title}, ${item.journalName || 'Dergi adı girilmemiş'}, ${item.volume || 'Cilt no girilmemiş'}, ${item.pages || 'Sayfa no girilmemiş'}, ${item.year || 'Yıl girilmemiş'}`;
      },
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
      textField: (item) => {
        if (!item.title) return 'Veri girilmemiş';
        return `${item.authors || 'Yazar girilmemiş'}, ${item.title}, ${item.conferenceName || 'Konferans adı girilmemiş'}, ${item.location || 'Konum girilmemiş'}, ${item.pages || 'Sayfa no girilmemiş'}, ${item.date || 'Tarih girilmemiş'}`;
      },
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
      textField: (item) => {
        if (!item.title) return 'Veri girilmemiş';
        return `${item.authors || 'Yazar girilmemiş'}, ${item.title}, ${item.publisher || 'Yayınevi girilmemiş'}, ${item.edition || 'Baskı girilmemiş'} ${item.location || 'Konum girilmemiş'}, ${item.year || 'Yıl girilmemiş'}`;
      },
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
      textField: (item) => {
        if (!item.title) return 'Veri girilmemiş';
        return `${item.citedWork || 'Atıf yapılan çalışma girilmemiş'}, Atıf sayısı: ${item.citationCount || '0'}`;
      },
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
      textField: (item) => {
        if (!item.course_name) return 'Veri girilmemiş';
        return `${item.course_name}, ${item.program || 'Program girilmemiş'}, ${item.semester || 'Dönem girilmemiş'}, ${item.year || 'Yıl girilmemiş'}`;
      },
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
      textField: (item) => {
        if (!item.title) return 'Veri girilmemiş';
        return `${item.studentName || 'Öğrenci adı girilmemiş'}, ${item.title}, ${item.institute || 'Enstitü girilmemiş'}, ${item.year || 'Yıl girilmemiş'}`;
      },
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
      textField: (item) => {
        if (!item.patentName) return 'Veri girilmemiş';
        return `${item.patentName}, ${item.year || 'Yıl girilmemiş'}`;
      },
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
      textField: (item) => {
        if (!item.projectName) return '-';
        return `${item.projectName}, ${item.projectNumber || ''}, ${item.institution || ''}, ${item.year || ''}`;
      },
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