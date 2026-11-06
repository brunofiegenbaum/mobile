import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const API_URL = "https://6aee55c9a677fe0fc14fdd41.mockapi.io/livros/v1/Livros";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [tituloLivro, setTituloLivro] = useState("");
  const [autorLivro, setAutorLivro] = useState("");
  const [generoLivro, setGeneroLivro] = useState("");
  const [anoLivro, setAnoLivro] = useState("");
  const [editoraLivro, setEditoraLivro] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  async function buscarLivros() {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    setLivros(dados);
  }

  async function salvarLivro() {
    if (idEditando === 0) {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: tituloLivro,
          autor: autorLivro,
          genero: generoLivro,
          ano: anoLivro,
          editora: editoraLivro,
        }),
      });
    } else {
      await fetch(API_URL + "/" + idEditando, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: tituloLivro,
          autor: autorLivro,
          genero: generoLivro,
          ano: anoLivro,
          editora: editoraLivro,
        }),
      });

      setIdEditando(0);
    }
    setTituloLivro("");
    setAutorLivro("");
    setGeneroLivro("");
    setAnoLivro("");
    setEditoraLivro("");

    buscarLivros();
  }

  async function excluir(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    buscarLivros();
  }

  async function editar(item) {
    setIdEditando(item.id);
    setTituloLivro(item.titulo);
    setAutorLivro(item.autor);
    setGeneroLivro(item.genero);
    setAnoLivro(item.ano);
    setEditoraLivro(item.editora);
  }

  useEffect(() => {
    buscarLivros();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Meus livros" }} />

      <TextInput
        style={styles.campo}
        value={tituloLivro}
        onChangeText={setTituloLivro}
        placeholder="Título do livro"
      />
      <TextInput
        style={styles.campo}
        value={autorLivro}
        onChangeText={setAutorLivro}
        placeholder="Autor do livro"
      />
      <TextInput
        style={styles.campo}
        value={generoLivro}
        onChangeText={setGeneroLivro}
        placeholder="Gênero do livro"
      />
      <TextInput
        style={styles.campo}
        value={anoLivro}
        onChangeText={setAnoLivro}
        keyboardType="numeric"
        placeholder="Ano do livro"
      />
      <TextInput
        style={styles.campo}
        value={editoraLivro}
        onChangeText={setEditoraLivro}
        placeholder="Editora do livro"
      />

      <View style={styles.botaoSalvar}>
        <Button title={idEditando === 0 ? "Salvar livro" : "Salvar edição"} onPress={salvarLivro} />
      </View>

      <FlatList
        style={styles.lista}
        data={livros}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.informacoes}>
              <Text style={styles.nome}>{item.titulo}</Text>
              <Text style={styles.detalhes}>Autor: {item.autor}</Text>
              <Text style={styles.detalhes}>Gênero: {item.genero}</Text>
              <Text style={styles.detalhes}>Ano: {item.ano}</Text>
              <Text style={styles.detalhes}>Editora: {item.editora}</Text>
            </View>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => editar(item)} />
              <Button title="Excluir" color="#C62828" onPress={() => excluir(item.id)} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  campo: {
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },

  botaoSalvar: {
    marginBottom: 8,
  },

  lista: {
    flex: 1,
    marginTop: 16,
  },

  item: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  informacoes: {
    flex: 1,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },

  detalhes: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 3,
  },

  botoes: {
    gap: 8,
    minWidth: 90,
  },
});
