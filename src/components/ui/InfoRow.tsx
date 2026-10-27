export default function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="info-row">
      <div className="info-icon">{icon}</div>
      <div className="info-body">
        <p className="text-body-large">{title}</p>
        {children}
      </div>
    </div>
  );
}
