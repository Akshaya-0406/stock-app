// App.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";

// ---------- Sample Data ----------
const initialStocks = [
  { id: "1", name: "Wall Tiles", qty: "200 boxes", price: "₹50,000" },
  { id: "2", name: "Floor Tiles", qty: "150 boxes", price: "₹40,000" },
  { id: "3", name: "Kitchen Tiles", qty: "100 boxes", price: "₹30,000" },
];

// ---------- Main App ----------
export default function App() {
  const [user, setUser] = useState(null); // null = not logged in
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stocks, setStocks] = useState(initialStocks);
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // ---------- Authentication ----------
  const handleLogin = () => {
    if (username === "sravan" && password === "dad123") {
      setUser("dad");
    } else if (username === "user" && password === "user123") {
      setUser("staff");
    } else {
      alert("Invalid credentials");
    }
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => setUser(null);

  // ---------- Stock Actions ----------
  const addStock = () => {
    if (!newName || !newQty || !newPrice) {
      alert("Fill all fields!");
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      name: newName,
      qty: newQty,
      price: newPrice,
    };
    setStocks([...stocks, newItem]);
    setNewName("");
    setNewQty("");
    setNewPrice("");
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter((item) => item.id !== id));
  };

  // ---------- Login Screen ----------
  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>R.K Tiles Mall</Text>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ---------- Dashboard ----------
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome {user === "dad" ? "Sravan (Dad)" : "Staff"}
        </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Dad Only: Add Stocks */}
        {user === "dad" && (
          <View style={styles.addBox}>
            <Text style={styles.sectionTitle}>Add New Stock</Text>
            <TextInput
              placeholder="Stock Name"
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              placeholder="Quantity"
              style={styles.input}
              value={newQty}
              onChangeText={setNewQty}
            />
            <TextInput
              placeholder="Price"
              style={styles.input}
              value={newPrice}
              onChangeText={setNewPrice}
            />
            <TouchableOpacity style={styles.button} onPress={addStock}>
              <Text style={styles.buttonText}>Add Stock</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Stock List */}
        <View style={{ padding: 16 }}>
          <Text style={styles.sectionTitle}>Available Stocks</Text>
          <FlatList
            data={stocks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardText}>🧱 {item.name}</Text>
                <Text style={styles.cardText}>📦 {item.qty}</Text>
                <Text style={styles.cardText}>💰 {item.price}</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>
                  {user === "dad" && (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteStock(item.id)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  loginBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1E3A8A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#1E3A8A",
    padding: 14,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
  header: {
    backgroundColor: "#1E3A8A",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: { color: "white", fontSize: 18, fontWeight: "700" },
  logoutButton: { backgroundColor: "#ef4444", padding: 10, borderRadius: 8 },
  logoutText: { color: "#fff", fontWeight: "600" },
  addBox: { padding: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1E3A8A",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  cardText: { fontSize: 16, marginBottom: 4, color: "#333" },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#1E3A8A",
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
});
