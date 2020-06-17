import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [   
    PassportModule.register({      
        defaultStrategy: 'jwt',      
        property: 'user',      
        session: false,    
    })
  ],  
  controllers: [AuthController],  
  providers: [AuthService, JwtStrategy],  
  exports: [PassportModule],
})

export class AuthModule {}
