import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

const apiKey = "RGAPI-52d04f84-d2dd-448b-81d7-b6b53c6d3500";

export default function Rotation() {
  const [champions, setChampions] = useState([]);
  const [championData, setChampionData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${apiKey}`
      )
      .then((response) => {
        setChampions(response.data.freeChampionIds);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://ddragon.leagueoflegends.com/cdn/13.5.1/data/fr_FR/champion.json"
      )
      .then((response) => {
        setChampionData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderChampions = () => {
    const rows = Math.ceil(champions.length / 4);
    const result = [];

    for (let i = 0; i < rows; i++) {
      const row = champions.slice(i * 4, i * 4 + 4);
      const championsRow = row.map((id) => {
        const championDataById = Object.values(championData.data).find(
          (obj) => parseInt(obj.key) === id
        );
        const championID = championDataById ? championDataById.id : "Unknown";
        console.log(championData.data);
        return (
          <View style={styles.championContainer} key={id}>
            <Image
              source={{
                uri: `https://ddragon.leagueoflegends.com/cdn/13.5.1/img/champion/${championID}.png`,
              }}
              style={styles.championImage}
            />
            <Text style={styles.championNom}>{championDataById.name}</Text>
          </View>
        );
      });
      result.push(
        <View style={styles.row} key={i}>
          {championsRow}
        </View>
      );
    }

    return result;
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/lol.png")} style={styles.image} />
      <Text style={styles.text}>Rotation pour cette semaine :</Text>
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView}>{renderChampions()}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#003882",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: 120,
    paddingBottom: 120,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 5,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  scrollView: {
    height: "60%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  championContainer: {
    alignItems: "center",
    margin: 5,
  },
  championImage: {
    width: 80,
    height: 80,
  },
  championID: {
    fontSize: 12,
    color: "white",
    marginTop: 5,
  },
  championNom: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});
