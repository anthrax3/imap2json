var mailjson = {};

function threadview(id) {
	id = id.split('-')[0]; // hash of first message - UID
	for (i=0; i<mailjson.length; i++) {
		if (mailjson[i].Id == id) {
			break;
		}
	}
	console.log("Found ", id, " at ", i);

	$('#title').html(mailjson[i].Msgs[0].Header.Subject);

	$.each(mailjson[i].Msgs, function(index, value) {
		msg = "<div class=mail>";
		msg += '<a title="UID" id=' + id + '-' +  value.UID + ' class="uid">' + value.UID + '</a>'
		msg += '<span class="from">';
		msg += '<span class="name"><span>' + value.Header.From + '</span>'
		msg += '</span>';
		msg += '<span class="to">to ';
		msg += '<span class="name"><span>' + value.Header.To + '</span>'
		msg += '</span><br>';
		msg += '<time class="time">' + value.Header.Date + '</time>';
		msg += "<hr><pre>";
		msg += $("<pre/>").text(value.Body).html();
        msg += "</pre></div>";
		$("#conversation").append(msg);
		console.log(index + ": " + value);
	});
}

function main() {
	id = window.location.hash.substr(1)
	if (id) {
		threadview(id);
	} else {
		$("#title").html('mail2json Index');
		$.each(mailjson, function(index, value) {
			console.log(value.Id)
			try {
			$("#conversation").append("<li><strong><a href=#" + value.Id + ">" + value.Id + "</strong> " + value.Msgs.length + " Subject: " + value.Msgs[0].Header.Subject + "</a></li>");
			} catch (e) {
				console.log(value, e);
			}
		});
	}
}

$(function() {
	$.getJSON("mail.json").done(function(data) {
		mailjson = data;
		main();
	});

	$(window).bind('hashchange', function() {
		$("#title").html('');
		$("#conversation").html('');
		main();
	});

});

