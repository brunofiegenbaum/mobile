import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [tituloLivro, setTituloLivro] = useState("");
  const [autorLivro, setAutorLivro] = useState("");
  const [generoLivro, setGeneroLivro] = useState("");
  const [anoLivro, setAnoLivro] = useState("");
  const [editoraLivro, setEditoraLivro] = useState("");

  async function buscarLivros() {
    const resposta = await fetch(
      "https://6aee55c9a677fe0fc14fdd41.mockapi.io/livros/v1/Livros",
    );
    const dados = await resposta.json();
    setLivros(dados);
  }

  async function salvarLivro() {
    await fetch("https://6aee55c9a677fe0fc14fdd41.mockapi.io/livros/v1/Livros", {
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
    setTituloLivro("");
    setAutorLivro("");
    setGeneroLivro("");
    setAnoLivro("");
    setEditoraLivro("");

    buscarLivros();
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

      <Button title="Salvar livro" onPress={salvarLivro} />

      <FlatList
        style={styles.lista}
        data={livros}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.id} - {item.titulo} - {item.autor} - {item.genero} - {item.ano} - {item.editora}
          </Text>
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

  lista: {
    flex: 1,
    marginTop: 16,
  },

  item: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    fontSize: 15,
    color: "#111827",
  },
});
