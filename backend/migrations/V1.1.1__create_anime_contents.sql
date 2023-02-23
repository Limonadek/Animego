create table anime_contents
(
	id int generated always as identity primary key,
	urlImage text not null,
	urlAnime text not null,
	urlWatch text not null,
	nameAnime text not null,
	categoryAnime text not null,
	ageAnime int not null,
	descriptionAnime text not null,
	episode int not null,
	status text not null,
	categories text not null,
	originalSource text not null,
	fullDescription text not null
)
