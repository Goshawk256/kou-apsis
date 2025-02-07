import PropTypes from 'prop-types';

const DataRow = ({ data, group, type }) => {
  if (!data || !Array.isArray(data)) {
    return (
      <>
        <td>yok</td>
        <td>-</td>
      </>
    );
  }

  const filteredData = data.filter(item => {
    const itemGroup = type === 'artworks' ? item.grup_adi : 
                     type === 'auto' ? item.groupAuto :
                     item.group;
    return itemGroup === group;
  });

  const getTitleField = (item) => {
    switch(type) {
      case 'courses':
        return item.course_name;
      case 'projects':
        return item.projectName;
      default:
        return item.title;
    }
  };

  const getScore = (item) => {
    const score = type === 'auto' ? item.scoreAuto : item.score;
    return score || 0;
  };

  return (
    <>
      <td>
        {filteredData.map((item, index) => (
          <div key={index}>{getTitleField(item)}</div>
        ))}
      </td>
      <td>
        {filteredData
          .reduce((acc, item) => acc + getScore(item), 0)
          .toFixed(2)}
      </td>
    </>
  );
};

DataRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    course_name: PropTypes.string,
    projectName: PropTypes.string,
    score: PropTypes.number,
    scoreAuto: PropTypes.number,
    group: PropTypes.string,
    groupAuto: PropTypes.string,
    grup_adi: PropTypes.string
  })),
  group: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['courses', 'projects', 'artworks', 'auto']).isRequired
};

export default DataRow;