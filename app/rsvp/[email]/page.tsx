import { RSVPForm } from '@/components/RSVP/RSVPForm';

export default async function RSVP({ params }: { params: Promise<{ email: string }> }) {
  const { email } = await params;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RSVPForm email={email} />
    </div>
  );
}
