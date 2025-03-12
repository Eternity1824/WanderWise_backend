import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'text', unique: true, nullable: true })
  email: string | null;

  @Index()
  @Column({ type: 'text', nullable: true })
  username: string | null;

  //-------------Oauth---------------
  // third party login method
  @Column({ type: 'text', nullable: true })
  provider: string | null; // e.g. "google", "wechat"

  @Column({ type: 'text', nullable: true, unique: true })
  providerId: string | null;

  //-------Management account--------
  @Column({ default: 'normalUser' })
  role: string;

  @Column({ default: true})
  isActive: boolean;

  //----------more feature-----------
  // store user interests efficiently
  @Column({ type: 'jsonb', nullable: true })
  interests: string[] | null;

  // if user's locations matters(e.g. current...)
  // use latitude and longitude for searching in PostGIS
  @Column({ type: 'float', nullable: true })
  latitude: number | null;

  @Column({ type: 'float', nullable: true })
  longitude: number | null;

  @Index()
  @Column({ type: 'tsvector', nullable: true })
  search_vector: string;


}
