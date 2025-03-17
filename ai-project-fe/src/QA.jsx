const QA = ({question, answer}) => {
  return (
  <div className="mt-2">
    <div className="font-bold text-lime-100">{answer}</div>
    <div className="text-red-100">{question}</div>
  </div>
  )
}

export default QA;