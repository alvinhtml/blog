<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('article_id');
            $table->integer('comment_id');
            $table->string('name')->comment("名称");
            $table->string('photo')->comment("照片");
            $table->string('email')->comment("邮箱");
            $table->string('url')->comment("网址");
            $table->string('ip')->comment("IP");
            $table->integer('favor')->comment("赞同");
            $table->integer('state')->comment("状态");
            $table->text('content')->comment("内容");
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
        Schema::dropIfExists('comments');
    }
}
