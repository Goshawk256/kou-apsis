import PropTypes from 'prop-types';

const DataRow = ({ data, group, type }) => {
  if (!data || !Array.isArray(data)) {
    return (
      <>
        <td>-</td>
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

  if (filteredData.length === 0) {
    return (
      <>
        <td>-</td>
        <td>-</td>
      </>
    );
  }

  return (
    <>
      {filteredData.map((item, index) => (
        index === 0 ? (
          <>
            <td rowSpan={filteredData.length}>{getTitleField(item)}</td>
            <td>{getScore(item).toFixed(2)}</td>
          </>
        ) : (
          <>
            <td>{getTitleField(item)}</td>
            <td>{getScore(item).toFixed(2)}</td>
          </>
        )
      ))}
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