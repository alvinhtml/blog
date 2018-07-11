<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('title')->comment("标题");
            $table->integer('classify_id')->index()->comment("类型");
            $table->string('author')->comment("作者");
            $table->string('media', 2000)->default('')->comment("媒体联接");
            $table->string('abstract', 1000)->default('')->comment("摘要");
            $table->text('content')->comment("内容");
            $table->string('editmode')->comment("编辑模式");
            $table->integer('favor')->comment("赞同");
            $table->integer('year')->index()->comment("年");
            $table->integer('month')->index()->comment("月");
            $table->integer('day')->index()->comment("日");
            $table->integer('state')->comment("状态"); // 草稿, 已发布
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
        Schema::dropIfExists('articles');
    }
}
