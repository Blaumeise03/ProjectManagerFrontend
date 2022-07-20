<template>
  <div id="errorFaqAccordion">
    <!--400 Bad Request-->
    <div class="card">
      <div class="card-header">
        <a class="btn" data-bs-toggle="collapse" href="#code400">
          Statuscode 400 Bad Request
        </a>
      </div>
      <div id="code400" class="collapse" :class="{show: code==400}" data-bs-parent="#errorFaqAccordion">
        <div class="card-body">
          Der Server konnte die Anfrage nicht verarbeiten, da sie Fehlerhaft ist.
          Überprüfen Sie bitte ihre bitte Ihre Eingaben und wenden Sie sich an einen
          Administrator wenn Sie denken, dass das Problem vom Server verursacht wurde.
        </div>
      </div>
    </div>
    <!--401 Unauthorized-->
    <div class="card">
      <div class="card-header">
        <a class="btn" data-bs-toggle="collapse" href="#code401">
          Statuscode 401 Unauthorized
        </a>
      </div>
      <div id="code401" class="collapse" :class="{show: code==401}" data-bs-parent="#errorFaqAccordion">
        <div class="card-body">
          Der Server hat die Anfrage aufgrund einer fehlenden/ungültigen Autorisation zurückgewiesen.
          Dies kann daran liegen, dass sie nicht angemeldet sind oder Ihre Sitzung abgelaufen ist.
          Bitte melden Sie sich neu an, tritt der Fehler weiterhin auf, kontaktieren sie einen Administrator.
        </div>
      </div>
    </div>
    <!--403 Forbidden-->
    <div class="card">
      <div class="card-header">
        <a class="btn" data-bs-toggle="collapse" href="#code403">
          Statuscode 403 Forbidden
        </a>
      </div>
      <div id="code403" class="collapse" :class="{show: code==403}" data-bs-parent="#errorFaqAccordion">
        <div class="card-body">
          Der Server hat die Anfrage aufgrund fehlender Berechtigungen abgelehnt. Wenn sie der
          Meinung sind, dass es sich um einen Fehler handelt, wenden Sie sich an einen Administrator.
        </div>
      </div>
    </div>
    <!--404 Not Found-->
    <div class="card">
      <div class="card-header">
        <a class="btn" data-bs-toggle="collapse" href="#code404">
          Statuscode 404 Not Found
        </a>
      </div>
      <div id="code404" class="collapse" :class="{show: code==404}" data-bs-parent="#errorFaqAccordion">
        <div class="card-body">
          Die angeforderte Ressource konnte nicht gefunden werden, sollte es sich hierbei um einen Fehler handeln,
          kontaktieren Sie bitte einen Administrator.
        </div>
      </div>
    </div>
    <!--500 Internal Server Error-->
    <div class="card">
      <div class="card-header">
        <a class="btn" data-bs-toggle="collapse" href="#code500">
          Statuscode 500 Internal Server Error
        </a>
      </div>
      <div id="code500" class="collapse" :class="{show: code==500}" data-bs-parent="#errorFaqAccordion">
        <div class="card-body">
          Ein interner Fehler ist beim Server aufgetreten, bitte senden sie die vollständige Fehlermeldung
          mit einer Beschreibung, wie der Fehler aufgetreten ist (um ihn reproduziern zu können) an einen
          Administrator.
        </div>
      </div>
    </div>
    <!--504 Gateway Timeout-->
    <div class="card">
      <div class="card-header">
        <a class="btn" data-bs-toggle="collapse" href="#code504">
          Statuscode 504 Gateway Timeout
        </a>
      </div>
      <div id="code504" class="collapse" :class="{show: code==504}" data-bs-parent="#errorFaqAccordion">
        <div class="card-body">
          Dieser Fehler zeigt ein Fehler im Proxy/Gateway an. Ein möglicher Grund ist, dass der API Server
          nicht erreichbar ist. Wenn der Fehler bestehen bleibt, informieren Sie bitte einen Administrator.
        </div>
      </div>
    </div>
    <!--Other Error Codes-->
    <div class="card">
      <div class="card-header">
        <a class="btn" data-bs-toggle="collapse" href="#other">
          Weitere Fehlercodes
        </a>
      </div>
      <div id="other" class="collapse" data-bs-parent="#errorFaqAccordion">
        <div class="card-body">
          Für alle weiteren Fehlercodes besuchen Sie bitte die folgende Seite:<br />
          <a href="https://developer.mozilla.org/de/docs/Web/HTTP/Status">https://developer.mozilla.org/de/docs/Web/HTTP/Status</a><br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      //The error code, the corresponding accordion card will be expanded by default
      code: {
        type: Number,
        default() {
          return -1;
        }
      }
    }
  }
</script>
