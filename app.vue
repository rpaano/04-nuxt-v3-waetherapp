<script setup lang="ts">
import { numericLiteral } from '@babel/types';

  const config = useRuntimeConfig()

  const cookie = useCookie("city")

  if(!cookie.value) cookie.value = "Mandaue"

  const search     = ref(cookie.value)
  const input      = ref("")
  const background = ref("")

//   const { data: city, error } = useFetch(
//     () =>
//       `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=05e38852d038fc10ed82dfeeaa150f74`
//   )

  const { data: city, error } = useAsyncData("city", async () => {
    let responce

    try {
      responce = await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}`, {
        params: {
          units: "metric",
          appid: config.WEATHER_APP_SECRET,
        }
      })

      cookie.value = responce.name

      const temp = responce.main.temp

      if (temp <= -10) {
        background.value =
          "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
      } else if (temp > -10 && temp <= 0) {
        background.value =
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
      } else if (temp > 0 && temp <= 10) {
        background.value =
          "https://images.unsplash.com/photo-1560258018-c7db7645254e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4032&q=80";
      } else {
        background.value =
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3546&q=80";
      }
    } catch (error) {
      
    }

    return responce
  }, {
    watch: [ search ]
  })

  const today = (new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleClick = () => {
    const trimmedSearch = input.value.trim()
    search.value = trimmedSearch
    input.value = ""
  }
</script>

<template>
  <div class="h-screen relative overflow-hidden">
    <img :src="background"/>
    <div class="absolute w-full h-full top-0 overlay"/>
    <div class="absolute w-full h-full top-0 p-48">
      <div class="flex justify-between">
        <div>
          <h1 class="text-7xl text-white">{{ city.name }}</h1>
          <p class="font-extralight text-2xl mt-2 text-white">{{ today }}</p>
          <img :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`" class="w-56 icon"/>
        </div>
        <div>
          <p class="text-9xl text-white font-extralight">{{ city.main.temp }}°</p>
        </div>
      </div>
      <div class="">
        <input type="text" class="w-1/2 h-10" placeholder="Search a city..." v-model="input">
        <button class="bg-sky-400 w-20 text-white h-10" @click="handleClick">Search</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .icon {
    margin-left: -2.75rem;
    margin-top: -2.75rem;

  }
</style>