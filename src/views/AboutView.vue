<template>
  <div class="about" data-testid="about">
    <p>このサイトではTimezone 一覧を表示しています</p>
    <p>
      Timezone の一覧は<a
        href="https://learn.microsoft.com/ja-jp/windows-hardware/manufacture/desktop/default-time-zones?view=windows-11"
        target="_blank"
        rel="noopener"
        >Default Time Zones</a
      >のページを参考にしています
    </p>
    <p>
      時刻の取得にはJavaScriptを使用しており、表示された現在時刻の一覧はクライアントシステムの時間に依存します
    </p>
    <p>
      おおよその現地時間が分かればよい、という用途においては参考にできるのではないかと思っています
    </p>
    <p style="text-decoration: underline">なお、サマータイムについては考慮していません</p>
    <p>お気づきの点ありましたら、上の<span>Contact</span>よりお願いします</p>
  </div>
</template>

<style scoped>
p {
  line-height: 2.5;
}
span {
  font-weight: bold;
}
</style>
