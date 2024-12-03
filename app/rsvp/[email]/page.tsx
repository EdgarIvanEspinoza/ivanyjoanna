import { RSVPForm } from '@/components/RSVP/RSVPForm';

export default function RSVP({ params }: { params: { email: string } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RSVPForm email={params.email} />
    </div>
  );
}
