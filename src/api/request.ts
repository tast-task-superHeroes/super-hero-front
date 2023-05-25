import { Hero } from "../types/hero";

const BASE_URL = 'https://superhero-bc13.onrender.com/heroes';


export const getSuperHeroes = async () => {
  try {
    const superHeroes = await fetch(BASE_URL, {
      method: "GET",
    });

    return superHeroes.json();
  } catch {
    return Promise.reject(new Error('Failed to get all Heroes from server'))
  };
};

export const getSuperHeroById = async (heroId: number) => {
  try {
    const superHeroes = await fetch(`${BASE_URL}/${heroId}`, {
      method: "GET",
    })

    return superHeroes.json();
  } catch {
    return Promise.reject(new Error('Failed to get Super Hero from server'));
  };
}

export const removeSuperHero = async (heroId: number) => {
  try {
    await fetch(`${BASE_URL}/${heroId}`, {
      method: "DELETE",
    })
  } catch {
    return Promise.reject(new Error('Failed to remove Super Hero from server'))
  };
}

export const updateSuperHero = async (heroId: number, body: Partial<Hero>) => {
  try {
    await fetch(`${BASE_URL}/${heroId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
  } catch {
    return Promise.reject(new Error('Failed to update Super Hero from server'));
  };
}

export const createSuperHero = async (body: Omit<Hero, 'id'>) => {
  try {
    await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
  } catch {
    return Promise.reject(new Error('Failed to update Super Hero from server'))
  };
}
