type AdoptionType = {
  adoption: {
    id: number;
    kotId: number;
    adoptujacyId: number;
    adoptionDate: string;
    isActive: boolean;
    adoptujacy: {
      id: number;
      name: string;
      surname: string;
      phoneNumber: string;
      email: string;
      isActive: boolean;
    };
    kot: {
      id: number;
      name: string;
      race: string;
      gender: string;
      color: string;
      dateOfBirth: string;
      dateOfArival: string;
      isAdopted: boolean;
    };
  };
};

export default function AdoptionsListItem({ adoption }: AdoptionType) {
  return (
    <div className="bg-orange-200 rounded-2xl p-4 flex flex-col gap-1">
      <div>
        <div className="font-semibold">Adoptujący:</div>
        <div>imię: {adoption.adoptujacy.name || "BRAK DANYCH"}</div>
        <div>nazwisko: {adoption.adoptujacy.surname || "BRAK DANYCH"}</div>
        <div>
          nr telefonu: {adoption.adoptujacy.phoneNumber || "BRAK DANYCH"}
        </div>
        <div>adres e-mail: {adoption.adoptujacy.email || "BRAK DANYCH"}</div>
      </div>
      <div>
        <div className="font-semibold">Kot:</div>
        <div>imię: {adoption.kot.name || "BRAK DANYCH"}</div>
        <div>płeć: {adoption.kot.gender || "BRAK DANYCH"}</div>
        <div>kolor: {adoption.kot.color || "BRAK DANYCH"}</div>
        <div>rasa: {adoption.kot.race || "BRAK DANYCH"}</div>
      </div>
      <div className="font-semibold">
        data adopcji: {adoption.adoptionDate.slice(0, 10) || "BRAK DANYCH"}
      </div>
    </div>
  );
}
