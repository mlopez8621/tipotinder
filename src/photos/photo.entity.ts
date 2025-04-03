import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  
  @Entity('photos')
  export class Photo {
    @PrimaryColumn('uuid')
    id: string;
  
    @Column()
    url: string;
  
    @Column({ default: false })
    is_main: boolean;
  
    @Column({ type: 'timestamp', name: 'uploaded_at', default: () => 'CURRENT_TIMESTAMP' })
    uploaded_at: Date;
  
    @ManyToOne(() => User, user => user.photos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  }
  