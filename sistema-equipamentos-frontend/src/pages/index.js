import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import { LuComputer } from "react-icons/lu";
import { createEquipment, deleteEquipment, getAllEquipment, updateEquipment } from "@/services/equipmetService";
import { toast } from "react-toastify";
import { withAuth } from "@/components/utils/withAuth";
import Loading from "@/components/loading";
import { MdEdit, MdDelete, MdOutlineLogout } from "react-icons/md";
import { AuthContext } from "@/context/AuthContext";


const modeloForms = {
  usuario: "",
  email: "",
  patrimonio: "",
  tipoEquip: "",
};

export default function Home() {
  const [formData, setFormData] = useState(modeloForms);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllEquipment();
        setTableData(response.data);
      } catch (error) {
        toast.error("Ocorreu um erro. Tente novamente!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const equipment = {
        email: formData.email,
        person_name: formData.usuario,
        type: formData.tipoEquip,
        asset_number: formData.patrimonio,
        created_by_user_id: user.id ?? 0,
      };

      await createEquipment(equipment);
      const response = await getAllEquipment();
      setTableData(response.data);
      setFormData(modeloForms);
      toast.success("Inserção registrada com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    try {
      setLoading(true);
      e.preventDefault();

      await deleteEquipment(id);
      const response = await getAllEquipment();
      setTableData(response.data);
      toast.success("Deletado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const equipment = {
        id: selectedItem.id,
        email: selectedItem.email,
        person_name: selectedItem.person_name,
        type: selectedItem.type,
        asset_number: selectedItem.asset_number,
      };
      
      await updateEquipment(selectedItem.id, equipment);
      const response = await getAllEquipment();
      setTableData(response.data);
      handleModalClose();
      toast.success("Atualização registrada com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar. Tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  const deslogar = async () => {
    try {
      setLoading(true);
      await signOut();
      
      toast.success("Deslogado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar. Tente novamente!");
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
          <div className={styles.header}>
            <div className={styles.title}>
              <LuComputer size={24} />
              <h1>Gestão de equipamentos</h1>
            </div>
            <div className={styles.titleDeslogar} onClick={deslogar}>
              <MdOutlineLogout size={32} />
              <span>Logout</span>
            </div>
          </div>
          <div className={styles.containerBox}>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                placeholder="Usuário"
                className={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className={styles.input}
                required
              />
              <input
                type="text"
                name="patrimonio"
                value={formData.patrimonio}
                onChange={handleChange}
                placeholder="Nº Patrimônio"
                className={styles.input}
                required
              />
              <input
                type="text"
                name="tipoEquip"
                value={formData.tipoEquip}
                onChange={handleChange}
                placeholder="Tipo do equipamento"
                className={styles.input}
                required
              />
              <button type="submit" className={styles.button}>
                Salvar
              </button>
            </form>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Número</th>
                  <th>Tipo do equipamento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.person_name}</td>
                    <td>{item.email}</td>
                    <td>{item.asset_number}</td>
                    <td>{item.type}</td>
                    <td className={styles.tableRight}>
                      <MdEdit onClick={(e) => handleEditClick(item)} size={24} />
                      <MdDelete onClick={(e) => handleDelete(e, item.id)} size={24} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isModalOpen && selectedItem && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.title}>Editar Item</h2>
            <div className={styles.divInput}>
              <input
                type="text"
                value={selectedItem.person_name}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, person_name: e.target.value })
                }
                className={styles.inputModal}
              />
              <input
                type="text"
                value={selectedItem.email}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, email: e.target.value })
                }
                className={styles.inputModal}
              />
              <input
                type="text"
                value={selectedItem.asset_number}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, asset_number: e.target.value })
                }
                className={styles.inputModal}
              />
              <input
                type="text"
                value={selectedItem.type}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, type: e.target.value })
                }
                className={styles.inputModal}
              />
            </div>
            <div className={styles.buttons}>
              <button onClick={handleModalClose} className={styles.cancelButton}>Cancelar</button>
              <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const getServerSideProps = withAuth(async (ctx) => {
  return {
    props: {}
  };
})