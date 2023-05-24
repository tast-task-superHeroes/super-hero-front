import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './FormLayout.scss';
import { Hero } from '../../types/hero';
import { createSuperHero, updateSuperHero } from '../../api/request';
import classNames from 'classnames';

type Props = {
  hero?: Hero;
  isRequired: boolean;
  heroId?: number;
  setIsOpen: (value: boolean) => void;
}

export const FormLayout: FC<Props> = ({
  hero,
  isRequired,
  heroId,
  setIsOpen,
}) => {
  const [nickname, setNickName] = useState('');
  const [realName, setRealName] = useState('');
  const [originDescription, setOriginDescription] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [superpower1, setSuperpower1] = useState('');
  const [superpower2, setSuperpower2] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [error, setIsError] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  useEffect(() => {
    if (
      nickname && realName && originDescription && superpower
      && superpower1 && superpower2 && catchPhrase && image
      && image1 && image2
    ) {
      setIsDisabledButton(false);
    }
  }, [
      nickname, realName, originDescription, superpower, superpower1,
      superpower2, catchPhrase, image, image1, image2
    ]);



  const handleUpdateHero = async() => {
    const newValues: Partial<Hero> = {};

    if (nickname) {
      newValues.nickname = nickname;
    }

    if (realName) {
      newValues.real_name = realName;
    }
  
    if (originDescription) {
      newValues.origin_description = originDescription;
    }

    if (superpower) {
      newValues.superpowers = [superpower];
    }

    if (catchPhrase) {
      newValues.catch_phrase = catchPhrase;
    }

    if (image) {
      newValues.images = [image];
    }

    try {
      await updateSuperHero(heroId || 0, newValues);
      setIsOpen(false);
    } catch {
      setIsError('Failed to update Super Hero from server')
    }
  }
  
  const handleCreateHero = async() => {
    const newSuperHero = {
      nickname,
      real_name: realName,
      origin_description: originDescription,
      superpowers: [
        superpower, superpower1, superpower2,
      ],
      catch_phrase: catchPhrase,
      images: [
        image, image1, image2,
      ]
    }

    await createSuperHero(newSuperHero);

    setIsOpen(false);
  }

  if (error) {
    return <h1>{error}</h1>
  }


  return (
    <Form>
      <div className="headerForm">
        {isRequired ? ( 
          <h3 className="formTitle" >All fields must be full</h3>
        ) : (
          <h3 className="formTitle" >{hero?.nickname}</h3>
        )}
        
        <button className="closeForm" onClick={() => setIsOpen(false)}/>
      </div>
      <Form.Group className="mb-3">
        <Form.Control
          maxLength={255}
          type="text"
          placeholder="nickname"
          value={nickname}
          onChange={({ target }) => setNickName(target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          maxLength={255}
          type="text"
          placeholder="real name"
          value={realName}
          onChange={({ target }) => setRealName(target.value)}
      />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          maxLength={255}
          type="text"
          placeholder="origin description"
          value={originDescription}
          onChange={({ target }) => setOriginDescription(target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          maxLength={255}
          type="text"
          placeholder="superpowers"
          value={superpower}
          onChange={({ target }) => setSuperpower(target.value)}
        />
      </Form.Group>

      {isRequired && (
        <>
          <Form.Group className="mb-2">
            <Form.Control
              maxLength={255}
              type="text"
              placeholder="superpowers 1"
              value={superpower1}
              onChange={({ target }) => setSuperpower1(target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Control
              maxLength={255}
              type="text"
              placeholder="superpowers 2"
              value={superpower2}
              onChange={({ target }) => setSuperpower2(target.value)}
            />
        </Form.Group>
        </>
      )}

      <Form.Group className="mb-2">
        <Form.Control
          maxLength={255}
          type="text"
          placeholder="catch phrase"
          value={catchPhrase}
          onChange={({ target }) => setCatchPhrase(target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          maxLength={255}
          type="text"
          placeholder="image"
          value={image}
          onChange={({ target }) => setImage(target.value)}
        />
      </Form.Group>

      {isRequired && (
        <>
          <Form.Group className="mb-2">
            <Form.Control
              maxLength={255}
              type="text"
              placeholder="image 2"
              value={image1}
              onChange={({ target }) => setImage1(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              maxLength={255}
              type="text"
              placeholder="image 3"
              value={image2}
              onChange={({ target }) => setImage2(target.value)}
            />
          </Form.Group>
        </>
      )}

        {isRequired ? (
          <Button
            className={classNames({'headerForm__button': isDisabledButton})}
            variant="primary"
            type="button"
            disabled={isDisabledButton}
            onClick={() => handleCreateHero()}
          >
            Add
        </Button>
        ) : (
          <Button
            variant="primary"
            type="button"
            onClick={() => handleUpdateHero()}
          >
            Update
          </Button>
        )}
    </Form>
  );
}
