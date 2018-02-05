<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment("名称");
            $table->string('photo')->comment("照片");
            $table->string('email')->unique()->comment("邮箱");
            $table->string('password', 255);
            $table->integer('type')->index()->comment("类型"); //管理员, 作者, 编辑, 投搞者, 订阅者
            $table->integer('state')->index()->comment("状态"); //停用, 启用, 未审核
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
