import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

// Cole aqui a URL do recurso 'livros' criado no seu MockAPI.
// Exemplo: https://SEU-PROJETO.mockapi.io/api/v1/livros
const API = "COLE_AQUI_A_URL_DO_MOCKAPI";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [editora, setEditora] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    if (!API.startsWith("https://")) {
      setErro("Configure a URL do MockAPI no arquivo src/app/index.js.");
      return;
    }

    setCarregando(true);
    setErro("");
    try {
      const resposta = await fetch(API);
      if (!resposta.ok) throw new Error("Erro ao buscar os livros.");
      const dados = await resposta.json();
      setLivros(dados);
    } catch (erro) {
      setErro("Não foi possível carregar os livros. Confira a URL e a internet.");
    } finally {
      setCarregando(false);
    }
  }

  async function salvar() {
    if (!titulo.trim() || !autor.trim() || !genero.trim() || !ano.trim() || !editora.trim()) {
      Alert.alert("Atenção", "Preencha os cinco campos.");
      return;
    }
    if (!API.startsWith("https://")) {
      Alert.alert("Atenção", "Configure a URL do MockAPI primeiro.");
      return;
    }

    setSalvando(true);
    try {
      const resposta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: titulo.trim(),
          autor: autor.trim(),
          genero: genero.trim(),
          ano: ano.trim(),
          editora: editora.trim(),
        }),
      });
      if (!resposta.ok) throw new Error("Erro ao salvar o livro.");

      setTitulo("");
      setAutor("");
      setGenero("");
      setAno("");
      setEditora("");
      await carregar();
      Alert.alert("Pronto", "Livro cadastrado!");
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar o livro.");
    } finally {
      setSalvando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Meus livros" }} />

      <Text style={styles.titulo}>Cadastrar livro</Text>
      <TextInput style={styles.campo} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.campo} placeholder="Autor" value={autor} onChangeText={setAutor} />
      <TextInput style={styles.campo} placeholder="Gênero" value={genero} onChangeText={setGenero} />
      <TextInput style={styles.campo} placeholder="Ano de publicação" keyboardType="numeric" value={ano} onChangeText={setAno} />
      <TextInput style={styles.campo} placeholder="Editora" value={editora} onChangeText={setEditora} />

      <Button title={salvando ? "Salvando..." : "Salvar livro"} onPress={salvar} disabled={salvando} />
      <Text style={styles.titulo}>Livros cadastrados</Text>
      {carregando && <ActivityIndicator />}
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
      <FlatList
        style={styles.lista}
        data={livros}
        keyExtractor={(item) => String(item.id)}
        onRefresh={carregar}
        refreshing={carregando}
        ListEmptyComponent={!carregando && !erro ? <Text>Nenhum livro cadastrado.</Text> : null}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.titulo}</Text>
            <Text>Autor: {item.autor}</Text>
            <Text>Gênero: {item.genero}</Text>
            <Text>Ano: {item.ano}</Text>
            <Text>Editora: {item.editora}</Text>
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
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 16,
    color: "#111827",
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
  lista: { flex: 1, marginTop: 8 },
  item: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  nome: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  erro: { color: "#B91C1C", marginBottom: 12 },
});
