import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "int" })
  duration: number;

  @Column({ type: "int" })
  price: number;
}

export default Movie;
