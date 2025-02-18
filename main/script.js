document.querySelectorAll('.metric').forEach(metric => {
    metric.addEventListener('mouseover', function() {
        document.getElementById('metric-title').textContent = this.textContent;
        document.getElementById('metric-info').textContent = `Showing insights for ${this.textContent}`;
        document.getElementById('metric-details').style.display = 'block';
        document.getElementById('metric-details').style.opacity = '1';
    });
    metric.addEventListener('mouseleave', function() {
        document.getElementById('metric-details').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('metric-details').style.display = 'none';
        }, 300);
    });
});