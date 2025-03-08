import { Module } from '@nestjs/common';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [CompanyModule, UserModule, SharedModule],
})
export class AppModule {}
