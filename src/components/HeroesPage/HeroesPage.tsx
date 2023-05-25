import React, { useEffect, useState } from "react";
import './HeroesPage.scss';
import { Hero } from '../../types/hero';
import { getSuperHeroes, removeSuperHero } from "../../api/request";
import { HeroItem } from "../HeroItem";
import { Loader } from "../Loader";
import { itemInPage } from "../../constant";
import classNames from 'classnames';
import { FormLayout } from "../FormLayout";
import { useNavigate } from "react-router-dom";



export const HeroesPage = () => {
  const [allHeroes, setAllHeroes] = useState<Hero[]>([]);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');

  const getAllHeroes = async() => {
    try {
      const heroes = await getSuperHeroes();

      setAllHeroes(heroes);
    } catch {
      setError('Unable to load Super Heroes');
    }
  };

  const handleChangePage = (number: number) => {
    setPage(prev => prev + number);
  };

  useEffect(() => {
    getAllHeroes();
  }, [isOpenAddForm]);

  const heroFrom = page * itemInPage;
  const heroTo = heroFrom + 5;
  const totalPage = Math.ceil(allHeroes.length / itemInPage);
  const pageArray = Array.from(Array(totalPage).keys());
  const isLastPage = page === totalPage - 1;
  const isFirstPage = page === 0;

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div
      className="heroPage"
      data-testid="test"
    >
      {allHeroes.length ? (
      isOpenAddForm ? (
        <div className="heroItem">
          <FormLayout isRequired={true} setIsOpen={setIsOpenAddForm} />
        </div>
      ) : (
        <>
          <button
            className="heroPage__addNew"
            onClick={() => setIsOpenAddForm(true)}
          >
            Add new
          </button>
          <div className="heroPage__list">

              {allHeroes.slice(heroFrom, heroTo).map(hero => (
              <HeroItem 
                key={hero.id}
                id={hero.id}
                image={hero.images[0]}
                nickname={hero.nickname}
              />
              ))}

          </div>
          
            <div className="heroPage__pagination">
              <button
                className={classNames('heroPage__left heroPage__button',
                  {'heroPage__button--disable': !isFirstPage},
                )}
                onClick={() => handleChangePage(-1)}
                disabled={isFirstPage}
              />

              {pageArray.map(number => (
                <li className={classNames('heroPage__link',
                  {'heroPage__link--active': number === page},
                )}
                onClick={() => setPage(number)}
                key={number}
                >
                  {number + 1}
                </li>
              ))}

              <button
                className={classNames('heroPage__right heroPage__button',
                  {'heroPage__button--disable': !isLastPage},
                )}
                onClick={() => handleChangePage(1)}
                disabled={isLastPage}
              />
            </div>
        </>
      )
      ) : (<Loader />)}
    </div>
  );
};
