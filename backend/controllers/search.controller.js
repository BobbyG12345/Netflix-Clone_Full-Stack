import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchTv(req, res) {
  try {
    const { query } = req.params;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query is required" });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "TV search results fetched successfully",
      content: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function searchMovie(req, res) {
  try {
    const { query } = req.params;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query is required" });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Movie search results fetched successfully",
      content: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function searchPerson(req, res) {
  try {
    const { query } = req.params;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query is required" });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Person search results fetched successfully",
      content: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({
      success: true,
      message: "Search history fetched successfully",
      content: req.user.searchHistory,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id } },
    });

    res.status(200).json({
      success: true,
      message: "Item removed from search history successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
