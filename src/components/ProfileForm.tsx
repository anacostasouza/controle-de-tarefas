interface ProfileFormProps {
  name: string;
  email: string;
  onChangeName: (value: string) => void;
  onSave: () => void;
  disableEmail?: boolean; // true se o email for só leitura
}

export function ProfileForm({
  name,
  email,
  onChangeName,
  onSave,
  disableEmail = false,
}: ProfileFormProps) {
  return (
    <div className="profile-form">
      <h1>Nome</h1>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
      />
      <h1>Email</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        readOnly={disableEmail} 
        onChange={disableEmail ? undefined : () => {}}
      />

      <button onClick={onSave}>Salvar</button>
    </div>
  );
}
