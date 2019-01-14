(function() {
  const tableBodyId = 'table-domains-body';

  function clearTable(table) {
    const tBody = document.getElementById(tableBodyId);
    if (tBody) {
      tBody.remove();
    }
    const newBody = document.createElement('tbody');
    newBody.id = tableBodyId;
    table.appendChild(newBody);
  }

  function updateTable(table, urlStorageManager) {
    clearTable(table);
    urlStorageManager.getUrls().then(urls => {
      const tBody = document.getElementById(tableBodyId);
      for (const url of urls) {
        const tr = document.createElement('tr');
        tr.classList.add('table-row');
        const td = document.createElement('td');
        td.textContent = url;
        tr.appendChild(td);
        if (tBody) {
          tBody.appendChild(tr);
        }
      }
    });
  }

  console.log('running settings script');
  const table = document.getElementById('table-domains');

  updateTable(table, urlStorageManager);
})();
