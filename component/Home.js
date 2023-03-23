import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const apiKey = "RGAPI-2dba51a0-126a-49bb-b50a-7b9bd16ac30a";

export default function Home() {
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState(null);
  const [summonerLeagueData, setSummonerLeagueData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
          headers: {
            "X-Riot-Token": apiKey,
          },
        }
      );
      const { profileIconId, name, summonerLevel, id } = response.data;
      const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/13.5.1/img/profileicon/${profileIconId}.png`;
      setSummonerData({ profileIconUrl, name, summonerLevel, id });

      const summonerEntriesResponse = await axios.get(
        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
        {
          headers: {
            "X-Riot-Token": apiKey,
          },
        }
      );
      console.log(summonerEntriesResponse);
      setSummonerLeagueData(
        summonerEntriesResponse.data
        //  { queueType: summonerEntries.queueType,
        //   tier: summonerEntries.tier,
        //   rank: summonerEntries.rank,
        //   leaguePoints: summonerEntries.leaguePoints,
        //   wins: summonerEntries.wins,
        //   losses: summonerEntries.losses, }
      );
    } catch (error) {
      console.error(error);
    }
  };

  console.log(summonerData, summonerLeagueData);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/lol.png")} style={styles.image} />
      <Text style={styles.text}>Rechercher Un Invocateur :</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom d'invocateur"
          onChangeText={setSummonerName}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      {summonerData && (
        <>
          <View style={styles.summonerDataContainer}>
            <Image
              source={{ uri: summonerData.profileIconUrl }}
              style={styles.profileIcon}
            />
            <Text style={styles.summonerData}>
              Nom d'invocateur: {summonerData.name}
            </Text>
            <Text style={styles.summonerData}>
              Niveau d'invocateur: {summonerData.summonerLevel}
            </Text>
          </View>
          <View style={styles.rankedDataContainer}>
            {summonerLeagueData &&
              summonerLeagueData.map((data, index) => (
                <View key={index} style={styles.summonerDataSection}>
                  <View style={styles.summonerDataHeader}>
                    <Text style={styles.summonerDataHeaderText}>
                      RANKED {/(?<=_)(.*)(?=_)/g.exec(data.queueType)[0]}
                    </Text>
                  </View>
                  <View style={styles.summonerDataContent}>
                    <Text style={styles.rankedData}>
                      Niveau: {data.tier} {data.rank}
                    </Text>
                    <Text style={styles.rankedData}>
                      Points de Ligue: {data.leaguePoints}
                    </Text>
                    <Text style={styles.rankedData}>
                      Victoires: {data.wins}
                    </Text>
                    <Text style={styles.rankedData}>
                      Défaites: {data.losses}
                    </Text>
                    <Image
                      source={{
                        uri: `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${data.tier.toLowerCase()}.png`,
                      }}
                      style={styles.profileIcon}
                    />
                  </View>
                </View>
              ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003882",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: -10,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    height: 40,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    width: "90%",
    height: 40,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  summonerDataContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  rankedDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
    color: "black",
    width: 400,
  },
  summonerDataSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    width: "48%",
    elevation: 5,
  },
  summonerDataHeader: {
    backgroundColor: "grey",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  summonerDataHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  summonerDataContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  summonerData: {
    color: "white",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  rankedData: {
    color: "grey",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  profileIcon: {
    marginTop: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 70,
    height: 70,
    alignSelf: "center",
    marginBottom: 30,
  },
});
