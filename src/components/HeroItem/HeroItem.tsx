import { FC } from "react";
import './HeroItem.scss';
import { Link } from "react-router-dom";

type Props = {
  image: string;
  nickname: string;
  id: number;
}

export const HeroItem: FC<Props> = ({ image, nickname, id }) => {
  return (
    <Link to={`/hero/${id}`} className="card">
      <img
        src={image}
        alt={nickname}
        className="card__image"
      />

      <span className="card__name" >{nickname}</span>
    </Link>
  );
};
