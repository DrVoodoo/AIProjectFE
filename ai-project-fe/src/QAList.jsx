import QA from './QA'

const QAList = ({qaList}) => {
  return (
  <>
    {qaList.map((qa, index) => (
      <QA key={index} question={qa.question} answer={qa.answer} />
    ))}
  </>
  )
}

export default QAList;