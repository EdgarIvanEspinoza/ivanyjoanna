import { subtitle } from '@/components/common/primitives';
import { Divider } from '@nextui-org/divider';

export default function EventPage() {
  return (
    <>
      <div>
        <h3 className={subtitle()}>
          Únete a nosotros para celebrar nuestro amor en el Palacio de Silvela
          en Aranjuez Madrid.
        </h3>
      </div>
      <Divider className="my-4" />
      <div>
        <h2 className={subtitle()}>Fecha</h2>
        <p className={subtitle()}>Viernes 10 de Octubre de 2025</p>
      </div>
      <Divider className="my-4" />
    </>
  );
}
