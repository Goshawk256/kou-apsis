import PropTypes from 'prop-types';

const TableSection = ({ title, subtitle, headers, children, sectionTotal }) => {
  return (
    <table className='finish-table'>
      <thead>
        <tr>
          <th colSpan="4" className="table-header">
            <strong>{title}</strong>
            {subtitle && <span> {subtitle}</span>}
          </th>
        </tr>
        {headers && (
          <tr>
            {headers.map((header, index) => (
              <td key={index}>{header}</td>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {children}
        {sectionTotal && (
          <tr>
            <td>Bölüm {title.charAt(0)}</td>
            <td>
              <tr>Toplam Puanı</tr>
            </td>
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
  children: PropTypes.node,
  sectionTotal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default TableSection;