import PropTypes from 'prop-types';

const TableSection = ({ title, subtitle, headers, data, groups, groupProperty, labelCallback, textField, scoreField, sectionTotal }) => {
  const renderPersonalInfoRows = () => {
    if (title === "GENEL PUANLAMA BİLGİLERİ") {
      const info = data[0];
      return (
        <>
          <tr>
            <td>Adı Soyadı (Ünvanı):</td>
            <td colSpan={3}>{info.name}</td>
          </tr>
          <tr>
            <td>Tarih:</td>
            <td colSpan={3}>{info.date}</td>
          </tr>
          <tr>
            <td>Başvurulan Birim:</td>
            <td colSpan={3}>{info.institution}</td>
          </tr>
          <tr>
            <td>Başvurduğu Akademik Kadro:</td>
            <td colSpan={3}>{info.position}</td>
          </tr>
        </>
      );
    }
    return null;
  };

  const renderRows = () => {
    if (title === "GENEL PUANLAMA BİLGİLERİ") {
      return renderPersonalInfoRows();
    }

    if (!data || !Array.isArray(data)) return null;

    return groups.map(group => {
      const groupData = data.filter(item => {
        const itemGroup = groupProperty === 'grup_adi' ? item.grup_adi :
                         groupProperty === 'groupAuto' ? item.groupAuto :
                         item[groupProperty];
        return itemGroup === group;
      });

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
          <td>{Number(item[scoreField] || 0).toFixed(2)}</td>
        </tr>
      ));
    });
  };

  return (
    <table className='finish-table'>
      <thead>
        <tr>
          <th colSpan="4" className="table-header">
            <strong>{title}</strong>
            {subtitle && <span> {subtitle}</span>}
          </th>
        </tr>
        {headers && title !== "GENEL PUANLAMA BİLGİLERİ" && (
          <tr>
            {headers.map((header, index) => (
              <td key={index}>{header}</td>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {renderRows()}
        {sectionTotal && (
          <tr>
            <td>Bölüm {title.charAt(0)}</td>
            <td>Toplam Puanı</td>
            <td>{sectionTotal}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

TableSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  groups: PropTypes.arrayOf(PropTypes.string),
  groupProperty: PropTypes.string,
  labelCallback: PropTypes.func,
  textField: PropTypes.string,
  scoreField: PropTypes.string,
  sectionTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TableSection;