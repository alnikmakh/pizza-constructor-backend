import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ login: username });

    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (user && isPasswordMatch) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
