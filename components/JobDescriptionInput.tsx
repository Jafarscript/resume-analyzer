const JobDescriptionInput = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  return (
    <div className="w-full">
      <label htmlFor="job-description" className="block mb-2 font-semibold text-gray-700">
        Job Description (Optional)
      </label>
      <textarea
        id="job-description"
        className="w-full border rounded-lg p-3 text-sm resize-none"
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here for a more targeted resume review..."
      />
    </div>
  );
};

export default JobDescriptionInput;
