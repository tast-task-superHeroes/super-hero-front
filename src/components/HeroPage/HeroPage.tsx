import { useLocation, useNavigate } from 'react-router-dom';
import './HeroPage.scss';
import { useEffect, useState } from 'react';
import { Hero } from '../../types/hero';
import { getSuperHeroById, removeSuperHero } from '../../api/request';
import { FormLayout } from '../FormLayout';
import { Loader } from '../Loader';
import { SuccessfulMessage } from '../SuccessfulMessage';

export const HeroPage = () => {
  const [superHero, setSuperHero] = useState<Hero>();
  const [error, setError] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isOpenChange, setIsOpenChange] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const heroId = +location.pathname.slice(6);

  const getSuperHero = async () => {
    try {
      const superHero = await getSuperHeroById(heroId);

      setSuperHero(superHero);
    } catch {
      setError('Failed to get Super Hero from server');
    }
  };

  const removeHero = async(heroId: number) => {
    openViewCHeck();

    try {
      await removeSuperHero(heroId);
      navigate('/');
    } catch {
      setError('Failed to remove Super Hero from server');
    }
  };

  const openViewCHeck = () => {
    setIsSuccessful(true);

    setTimeout(() => {
      setIsSuccessful(false);
    }, 3000);
  };

  useEffect(() => {
    getSuperHero();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroId, isOpenChange]);

  if (error) {
    return (
      <h1>{error}</h1>
    )
  };

  if (isSuccessful) {
    return (
      <div className="heroItem">
        <SuccessfulMessage />
      </div>
    )
  }
  
  return (
    <div className="heroItem">
      {superHero ? (
        <>
          {isOpenChange ? (
            <FormLayout
            hero={superHero}
            isRequired={false}
            heroId={heroId}
            setIsOpen={setIsOpenChange}
            openViewCHeck={openViewCHeck}
          />
        ) : (
        <>
          <button 
            className="heroItem__back heroItem__button"
            onClick={() => navigate('/')}
          />
          <button className="heroItem__delete heroItem__button"
          onClick={() => removeHero(heroId)}/>
          <div className="heroItem__images">
            {superHero?.images.slice(1).map(image => (
              <img
                src={image}
                alt={image}
                className="heroItem__image"
                key={image}
              />
            ))}
            <button
              className="heroItem__edit heroItem__button"
              onClick={() => setIsOpenChange(true)}
            />
          </div>
          <div className="heroItem__information">
            <span className="heroItem__span">{`Nick-Name: ${superHero?.nickname}`}</span>
            <span className="heroItem__span">{`Real name: ${superHero?.real_name}`}</span>
            <span className="heroItem__span">{`Description: ${superHero?.origin_description}`}</span>
            <span className="heroItem__span">
              Superpowers:
              {superHero?.superpowers.map(power => (
                <li key={power}>{power}</li>
              ))}
            </span>
            <span className="heroItem__span">{`Catch Phrase: ${superHero?.catch_phrase}`}</span>
          </div>
        </>
        )}
      </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
