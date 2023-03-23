import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";

const apiKey = "RGAPI-52d04f84-d2dd-448b-81d7-b6b53c6d3500";
const weatherApiKey = "096e848e1507e1e7e5c91003289f6c7b";

export default function Home() {
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState(null);
  const [summonerLeagueData, setSummonerLeagueData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("La permission de localisation est requise");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&lang=fr`
      );
      setWeatherData(weatherResponse.data);
    })();
  }, []);

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
      setSummonerLeagueData(summonerEntriesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
          <Text style={styles.weatherText}>
            {weatherData.name}, {weatherData.sys.country}
          </Text>
          </Text>
          <Text>
          ({weatherData.weather[0].description})
          </Text>
          
          <Text style={styles.weatherText}>
            {Math.round(weatherData.main.temp - 273.15)}°C
          </Text>
        </View>
      )}
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
  weatherContainer: {
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});


