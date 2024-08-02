import { useContext, useState } from "react";
import styles from "../../styles/Login.module.css";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import Loading from "@/components/loading";
import { withoutAuth } from "@/components/utils/withoutAuth";

const modeloForms = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(modeloForms);
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn({ email: formData.email, password: formData.password });
      setFormData(modeloForms);
      toast.success("Logado com sucesso!");
    } catch (error) {
      toast.error("Usuário ou senha incorretos. ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading-overlay">
          <Loading />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Gestão de equipamentos</h1>
            <h2>Conecte-se</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <div className={styles.inputs}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.input}
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha"
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              Logar
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export const getServerSideProps = withoutAuth(async (ctx) => {
  return {
    props: {}
  };
})