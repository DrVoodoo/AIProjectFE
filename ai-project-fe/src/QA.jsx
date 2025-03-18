import ReactMarkdown from "react-markdown";

const QA = ({question, answer}) => {
  return (
  <div className="mt-2">
    <div className="font-bold text-lime-100">
      <ReactMarkdown>
        {answer}
      </ReactMarkdown>
    </div>
    <div className="text-red-100">{question}</div>
  </div>
  )
}

export default QA;