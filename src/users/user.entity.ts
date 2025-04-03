import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Photo } from '../photos/photo.entity';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'float', nullable: true })
  location_lat: number;

  @Column({ type: 'float', nullable: true })
  location_lon: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];
}
